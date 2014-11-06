var ChunkResponsesManager =
{
    ResetExResultBatches: {},

    consumeResetExResponse: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) {
            batch = {
                chunksArrived: 0,
                batchSize: -1,
                parts: [],
                groupId: -1,
                readyPartFlags: 0
            };

            this.MessageQueryResultBatches[response.Hash] = batch;
        }

        batch.chunksArrived ++;

        if (response.IsLast)
            batch.batchSize = response.Part + 1;

        batch.parts[response.Part] = response;

        var firstArrivedPartsFlags = response.PartDataFlags & ~(batch.readyPartFlags);

        batch.readyPartFlags |= response.PartDataFlags;

        return {
            Flags: response.Flags,
            PartDataFlags: response.PartDataFlags,
            FirstArrivedPartsFlags: firstArrivedPartsFlags,
            IsFirst: (response.Part == 0),
            IsLast: response.IsLast,
            BatchCompleted: batch.batchSize >= 0 && batch.chunksArrived >= batch.batchSize
        };
    },

    disposeResetExBatch: function(response) {
        delete this.MessageQueryResultBatches[response.Hash];
    },

    getResetBatchDataFriends: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) return null;

        var result = {
            Friends: []
        };

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (part.Friends != null)
                result.Friends = result.Friends.concat(part.Friends);
        };

        return result.Friends;
    },

    getResetBatchDataFriendRequests: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) return null;

        var result = {
            FriendshipRequests: []
        };

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (part.FriendshipRequests != null)
                result.FriendshipRequests = result.FriendshipRequests.concat(part.FriendshipRequests);
        };

        return result.FriendshipRequests;
    },

    getResetBatchDataFavorites: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) return null;

        var result = {
            Favorites: []
        };

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (part.Favorites != null)
                result.Favorites = result.Favorites.concat(part.Favorites);
        };

        return result.Favorites;
    },

    getResetBatchDataMessageGroups: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) return null;

        var result = {
            MessageGroups: []
        };

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (part.MessageGroups != null)
                result.MessageGroups = result.MessageGroups.concat(part.MessageGroups);
        };

        return result.MessageGroups;
    },

    getResetBatchDataLinks: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) return null;

        var result = {
            Links: {
                FeaturedLinks: [],
                FriendsShares: [],
                TopRatedLinks: []
            }
        };

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (part.Links != null) {
                if (part.Links.FeaturedLinks)
                    $.merge(result.Links.FeaturedLinks, part.Links.FeaturedLinks);
                if (part.Links.FriendsShares)
                    $.merge(result.Links.FriendsShares, part.Links.FriendsShares);
                if (part.Links.TopRatedLinks)
                    $.merge(result.Links.TopRatedLinks, part.Links.TopRatedLinks);
            }
        };

        return result.Links;
    },

    getResetBatchDataMessagesInfo: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) return null;

        var result = {
            MessagesInfo: {
                GroupData: []
            }
        };

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (part.MessagesInfo != null && part.MessagesInfo.GroupData != null) {

                // loop groups in part
                for (var groupId in part.MessagesInfo.GroupData) {
                    var srcGroupData = angular.copy(part.MessagesInfo.GroupData[groupId]);

                    // populate messages arrived in batch
                    if (result.MessagesInfo.GroupData[groupId] == null) {                        
                        result.MessagesInfo.GroupData[groupId] = angular.copy(srcGroupData);
                        continue;
                    }

                    // loop days in the group
                    for (var iDate in srcGroupData.DateInfo) {
                        var srcDateInfo = angular.copy(srcGroupData.DateInfo[iDate]);
                        var dstDateInfo = -1;

                        for (var iDstDateInfo = result.MessagesInfo.GroupData[groupId].DateInfo.length - 1;
                            iDstDateInfo >= 0; iDstDateInfo --) {

                            if (result.MessagesInfo.GroupData[groupId].DateInfo[iDstDateInfo].Date == srcDateInfo.Date) {
                                dstDateInfo = iDstDateInfo;
                                break;
                            }
                        }
                        
                        if (dstDateInfo == -1) {
                            result.MessagesInfo.GroupData[groupId].DateInfo.push(srcDateInfo);
                        } else {
                            result.MessagesInfo.GroupData[groupId].DateInfo[dstDateInfo].Messages =
                                result.MessagesInfo.GroupData[groupId].DateInfo[dstDateInfo].Messages.concat(srcDateInfo.Messages);
                        }
                    }
                }
            }
        };

        return result.MessagesInfo;
    },

    MessageQueryResultBatches: {},

    consumeMessageQueryResultResponse: function(response) {
        var batch = this.MessageQueryResultBatches[response.Hash];

        if (batch == null) {
            batch = {
                chunksArrived: 0,
                batchSize: -1,
                parts: [],
                groupId: -1
            };

            this.MessageQueryResultBatches[response.Hash] = batch;
        }

        batch.chunksArrived ++;

        if (response.IsLast)
            batch.batchSize = response.Part + 1;

        batch.parts[response.Part] = response;

        return {
            IsFirst: (response.Part == 0),
            IsLast: response.IsLast,
            BatchCompleted: batch.batchSize >= 0 && batch.chunksArrived >= batch.batchSize
        };
    },

    applyMessageQueryResults: function() {
        // loop over pending batchs 
        for (var hash in this.MessageQueryResultBatches) {
            var batch = this.MessageQueryResultBatches[hash];

            var processedGroups = [];

            // loop over arrived groups 
            for (var iPart in batch.parts) {
                var part = batch.parts[iPart];

                for (var groupId in part.GroupData) {
                    var groupData = part.GroupData[groupId];

                    // populate messages arrived in batch
                    if (global.scopes.swapcast.swapSettings.Messages.GroupData[groupId] == null) {
                        global.scopes.swapcast.swapSettings.Messages.GroupData[groupId] = groupData;
                        continue;
                    }

                    if (processedGroups[groupId] == null)
                        global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo = [];

                    processedGroups[groupId] = true;

                    for (var iDate in groupData.DateInfo) {
                        var srcDateInfo = groupData.DateInfo[iDate];
                        var dstDateInfo = -1;

                        for (var iDstDateInfo = global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo.length - 1;
                            iDstDateInfo >= 0; iDstDateInfo --) {

                            if (global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo[iDstDateInfo].Date == srcDateInfo.Date) {
                                dstDateInfo = iDstDateInfo;
                                break;
                            }
                        }

                        if (dstDateInfo == -1) {
                            global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo.push(srcDateInfo);
                            dstDateInfo = global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo.length - 1;
                        } else {
                            global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo[dstDateInfo].Messages =
                                global.scopes.swapcast.swapSettings.Messages.GroupData[groupId].DateInfo[dstDateInfo].Messages.concat(srcDateInfo.Messages);
                        }

                    }
                }

                if (batch.batchSize >= 0 && batch.chunksArrived >= batch.batchSize) {
                    // delete batch data 
                    this.MessageQueryResultBatches[hash] = null;
                    delete this.MessageQueryResultBatches[hash];
                }
            }
        }
    },

    MessageUpdateBatches: {},

    consumeMessageUpdatedChunkResponse: function(response) {
        var batch = this.MessageUpdateBatches[response.Hash];

        if (batch == null) {
            batch = {
                chunksArrived: 0,
                batchSize: -1,
                parts: [],
            };

            this.MessageUpdateBatches[response.Hash] = batch;
        }

        batch.chunksArrived++;

        if (response.IsLast)
            batch.batchSize = response.Part + 1;

        batch.parts[response.Part] = response;

        return {
            IsFirst: (response.Part == 0),
            IsLast: response.IsLast,
            BatchCompleted: batch.batchSize >= 0 && batch.chunksArrived >= batch.batchSize
        };
    },

    messageUpdatedGetMessageData: function(response) {
        var batch = this.MessageUpdateBatches[response.Hash];

        if (batch == null) {
            return null;
        }

        var result = {};

        // loop parts 
        for (var iPart in batch.parts) {
            var part = batch.parts[iPart];

            if (iPart == 0) {
                result = batch.parts[iPart];
            } else if (part.Comments != null)
                result.Comments = result.Comments.concat(part.Comments);
        };

        return result;
    },

    disposeMessageUpdatedGetMessageData: function(response) {
        delete this.MessageUpdateBatches[response.Hash];
    }
};