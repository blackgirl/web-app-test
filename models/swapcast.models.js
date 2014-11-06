//-----------------------
// Enums
// Defines status of change password operation
var ChangePasswordStatus = {
    // Operation completed successful
    OK: 0,
    // Provided user name doesn’t exists
    UserNotExists: 1,
    // Provided current password does not match
    CurrentPasswordDoesNotMatch: 2
};

// Contains change password reasons
var ChangePasswordReason = {
    // Password was forgotten
    Recovery: 0,
    // Password was changed
    Update: 1
};

var ConferenceType = {
    // N-N video chat 
    VideoChat : 0,

    // 1-N screen broadcasting 
    ScreenSharing : 1
};
//swap Settings model
var swapSettings = {
    UserProfile: {},
    EditingProfile: {},
    Friends: {},
    Messages: {},
    MessageGroups: [],
    Favorites: [],
    FriendshipRequests: [],
    FavIcons : []
};

//tabs
var tabs = {
    feed: { selected: true },
    groups: { selected: true },
    friends: { selected: true },
    favorites: { selected: true }
};

//profile
profile = {
    UserPic: null,
    Email: null,
    FirstName: null,
    LastName: null
};

// group Members
groupMembers = {
    invited: new Array(),
    participant: new Array(),
    nonparticipant: new Array(),
};

//months of year
var months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
};


var Global = function() {
    this.scopes = {
        swapcast: {},
        messages: {},
        videoChat: {},
        auth: {},
        favorites: {},
        friends: {},
        snapshot: {},
        webBrowser: {}
    };

    return this;
};

var smileGroups = [
    {
        index: 0,
        smiles: [
            {
                text: "(lol:)",
                link: "img/emo_png/emo_15_b.png",
                small: "img/emo_png/small/emo_15_s.png"
            },
            {
                text: "(devil)",
                link: "img/emo_png/emo_01_b.png",
                small: "img/emo_png/small/emo_1_s.png"
            },
            {
                text: ";(",
                link: "img/emo_png/emo_02_b.png",
                alt: ";-(",
                small: "img/emo_png/small/emo_2_s.png"
            },
            {
                text: ":^)",
                link: "img/emo_png/emo_03_b.png",
                small: "img/emo_png/small/emo_3_s.png"
            },
            {
                text: "(surprized)",
                link: "img/emo_png/emo_04_b.png",
                small: "img/emo_png/small/emo_4_s.png"
            },
            {
                text: "(think)",
                link: "img/emo_png/emo_05_b.png",
                small: "img/emo_png/small/emo_5_s.png"
            },
            {
                text: "(laugh)",
                link: "img/emo_png/emo_06_b.png",
                small: "img/emo_png/small/emo_6_s.png"
            },
            {
                text: ":(",
                alt: ":-(",
                link: "img/emo_png/emo_07_b.png",
                small: "img/emo_png/small/emo_7_s.png"
            },
            {
                text: "(tears)",
                link: "img/emo_png/emo_08_b.png",
                small: "img/emo_png/small/emo_8_s.png"
            },
            {
                text: "(drunk)",
                link: "img/emo_png/emo_09_b.png",
                small: "img/emo_png/small/emo_9_s.png"
            },
            {
                text: ":)",
                alt: ":-)",
                link: "img/emo_png/emo_10_b.png",
                small: "img/emo_png/small/emo_10_s.png"
            },
            {
                text: ":D",
                alt: ":-D",
                link: "img/emo_png/emo_11_b.png",
                small: "img/emo_png/small/emo_11_s.png"
            },
            {
                text: "(mad)",
                link: "img/emo_png/emo_12_b.png",
                small: "img/emo_png/small/emo_12_s.png"
            },
            {
                text: "(:|",
                link: "img/emo_png/emo_13_b.png",
                small: "img/emo_png/small/emo_13_s.png"
            },
            {
                text: "(lol)",
                link: "img/emo_png/emo_14_b.png",
                small: "img/emo_png/small/emo_14_s.png"
            },
            {
                text: ":p",
                alt: ":-p",
                link: "img/emo_png/emo_16_b.png",
                small: "img/emo_png/small/emo_16_s.png"
            },
            {
                text: "(cool)",
                link: "img/emo_png/emo_17_b.png",
                small: "img/emo_png/small/emo_17_s.png"
            },
            {
                text: "|-(",
                link: "img/emo_png/emo_18_b.png",
                small: "img/emo_png/small/emo_18_s.png"
            },
            {
                text: ";)",
                alt: ";-)",
                link: "img/emo_png/emo_19_b.png",
                small: "img/emo_png/small/emo_19_s.png"
            },
            {
                text: ":O",
                alt: ":-O",
                link: "img/emo_png/emo_20_b.png",
                small: "img/emo_png/small/emo_20_s.png"
            },
            {
                text: "(inlove)",
                link: "img/emo_png/emo_21_b.png",
                small: "img/emo_png/small/emo_21_s.png"
            },
            {
                text: "(sleep)",
                link: "img/emo_png/emo_22_b.png",
                small: "img/emo_png/small/emo_22_s.png"
            },
            {
                text: ":x",
                alt: ":-x",
                link: "img/emo_png/emo_23_b.png",
                small: "img/emo_png/small/emo_23_s.png"
            },
            {
                text: "(smirk)",
                link: "img/emo_png/emo_24_b.png",
                small: "img/emo_png/small/emo_24_s.png"
            },
            {
                text: "(angel)",
                link: "img/emo_png/emo_25_b.png",
                small: "img/emo_png/small/emo_25_s.png"
            },
             {
                 text: "(angry)",
                 link: "img/emo_png/emo_26_b.png",
                 small: "img/emo_png/small/emo_26_s.png"
             },
            {
                text: "(love)",
                link: "img/emo_png/emo_27_b.png",
                small: "img/emo_png/small/emo_27_s.png"
            },
            {
                text: "(tmi)",
                link: "img/emo_png/emo_28_b.png",
                small: "img/emo_png/small/emo_28_s.png"
            },
            {
                text: "(cry)",
                link: "img/emo_png/emo_29_b.png",
                small: "img/emo_png/small/emo_29_s.png"
            },
            {
                text: "(music)",
                link: "img/emo_png/emo_30_b.png",
                small: "img/emo_png/small/emo_30_s.png"
            },
            {
                text: "(happy)",
                link: "img/emo_png/emo_31_b.png",
                small: "img/emo_png/small/emo_31_s.png"
            },
            {
                text: ":*",
                alt: ":-*",
                link: "img/emo_png/emo_32_b.png",
                small: "img/emo_png/small/emo_32_s.png"
            }
        ],
        icon: "img/emo_png/small/emo_15_s.png",
        inactiveIcon: "img/emo_png/small/emo_15_s.png",
        isActive: true
    },
    {
        index: 1,
        smiles: [
            {
                text: "(anim1)",
                link: "img/emo_png/anim1.png",
                small: "img/emo_png/small/anim1_small.png"
            },
            {
            text: "(anim2)",
            link: "img/emo_png/anim2.png",
            small: "img/emo_png/small/anim2_small.png"
            },
            {
                text: "(anim3)",
                link: "img/emo_png/anim3.png",
                small: "img/emo_png/small/anim3_small.png"
            },
            {
                text: "(anim4)",
                link: "img/emo_png/anim4.png",
                small: "img/emo_png/small/anim4_small.png"
            },
            {
                text: "(anim5)",
                link: "img/emo_png/anim5.png",
                small: "img/emo_png/small/anim5_small.png"
            },
            {
                text: "(anim6)",
                link: "img/emo_png/anim6.png",
                small: "img/emo_png/small/anim6_small.png"
            },
            {
                text: "(anim7)",
                link: "img/emo_png/anim7.png",
                small: "img/emo_png/small/anim7_small.png"
            },
            {
                text: "(anim8)",
                link: "img/emo_png/anim8.png",
                small: "img/emo_png/small/anim8_small.png"
            },
            {
                text: "(anim9)",
                link: "img/emo_png/anim9.png",
                small: "img/emo_png/small/anim9_small.png"
            },
            {
                text: "(anim10)",
                link: "img/emo_png/anim10.png",
                small: "img/emo_png/small/anim10_small.png"
            },
            {
                text: "(anim11)",
                link: "img/emo_png/anim11.png",
                small: "img/emo_png/small/anim11_small.png"
            },
            {
                text: "(anim12)",
                link: "img/emo_png/anim12.png",
                small: "img/emo_png/small/anim12_small.png"
            }
        ],
        icon: "img/emo_png/small/anim1_small.png",
        inactiveIcon: "img/emo_png/small/anim1_small.png",
        isActive: false
    },
    {
        index: 2,
        smiles: [
            {
                text: "(pan1)",
                link: "img/emo_png/pan1.png",
                small: "img/emo_png/small/pan1_small.png"
            },
            {
                text: "(pan2)",
                link: "img/emo_png/pan2.png",
                small: "img/emo_png/small/pan2_small.png"
            },
            {
                text: "(pan3)",
                link: "img/emo_png/pan3.png",
                small: "img/emo_png/small/pan3_small.png"
            },
            {
                text: "(pan4)",
                link: "img/emo_png/pan4.png",
                small: "img/emo_png/small/pan4_small.png"
            },
            {
                text: "(pan5)",
                link: "img/emo_png/pan5.png",
                small: "img/emo_png/small/pan5_small.png"
            },
            {
                text: "(pan6)",
                link: "img/emo_png/pan6.png",
                small: "img/emo_png/small/pan6_small.png"
            },
            {
                text: "(pan7)",
                link: "img/emo_png/pan7.png",
                small: "img/emo_png/small/pan7_small.png"
            },
            {
                text: "(pan8)",
                link: "img/emo_png/pan8.png",
                small: "img/emo_png/small/pan8_small.png"
            },
            {
                text: "(pan9)",
                link: "img/emo_png/pan9.png",
                small: "img/emo_png/small/pan9_small.png"
            }
        ],
        icon: "img/emo_png/small/pan1_small.png",
        inactiveIcon: "img/emo_png/small/pan1_small.png",
        isActive: false
    },
    {
        index: 3,
        smiles: [
            {
                text: "(sym1)",
                link: "img/emo_png/sym1.png",
                small: "img/emo_png/small/sym1_small.png"
            },
            {
                text: "(sym2)",
                link: "img/emo_png/sym2.png",
                small: "img/emo_png/small/sym2_small.png"
            },
            {
                text: "(sym3)",
                link: "img/emo_png/sym3.png",
                small: "img/emo_png/small/sym3_small.png"
            },
            {
                text: "(sym4)",
                link: "img/emo_png/sym4.png",
                small: "img/emo_png/small/sym4_small.png"
            },
            {
                text: "(sym5)",
                link: "img/emo_png/sym5.png",
                small: "img/emo_png/small/sym5_small.png"
            },
            {
                text: "(sym6)",
                link: "img/emo_png/sym6.png",
                small: "img/emo_png/small/sym6_small.png"
            },
            {
                text: "(sym7)",
                link: "img/emo_png/sym7.png",
                small: "img/emo_png/small/sym7_small.png"
            },
            {
                text: "(sym8)",
                link: "img/emo_png/sym8.png",
                small: "img/emo_png/small/sym8_small.png"
            },
            {
                text: "(sym9)",
                link: "img/emo_png/sym9.png",
                small: "img/emo_png/small/sym9_small.png"
            },
            {
                text: "(sym10)",
                link: "img/emo_png/sym10.png",
                small: "img/emo_png/small/sym10_small.png"
            },
            {
                text: "(sym11)",
                link: "img/emo_png/sym11.png",
                small: "img/emo_png/small/sym11_small.png"
            },
            {
                text: "(sym12)",
                link: "img/emo_png/sym12.png",
                small: "img/emo_png/small/sym12_small.png"
            }
        ],
        icon: "img/emo_png/small/sym1_small.png",
        inactiveIcon: "img/emo_png/small/sym1_small.png",
        isActive: false
    },
    {
        index: 4,
        smiles: [
            {
                text: "(vac1)",
                link: "img/emo_png/vac1.png",
                small: "img/emo_png/small/vac1_small.png"
            },
            {
                text: "(vac2)",
                link: "img/emo_png/vac2.png",
                small: "img/emo_png/small/vac2_small.png"
            },
            {
                text: "(vac3)",
                link: "img/emo_png/vac3.png",
                small: "img/emo_png/small/vac3_small.png"
            },
            {
                text: "(vac4)",
                link: "img/emo_png/vac4.png",
                small: "img/emo_png/small/vac4_small.png"
            },
            {
                text: "(vac5)",
                link: "img/emo_png/vac5.png",
                small: "img/emo_png/small/vac5_small.png"
            },
            {
                text: "(vac6)",
                link: "img/emo_png/vac6.png",
                small: "img/emo_png/small/vac6_small.png"
            },
            {
                text: "(vac7)",
                link: "img/emo_png/vac7.png",
                small: "img/emo_png/small/vac7_small.png"
            },
            {
                text: "(vac8)",
                link: "img/emo_png/vac8.png",
                small: "img/emo_png/small/vac8_small.png"
            },
            {
                text: "(vac9)",
                link: "img/emo_png/vac9.png",
                small: "img/emo_png/small/vac9_small.png"
            },
            {
                text: "(vac10)",
                link: "img/emo_png/vac10.png",
                small: "img/emo_png/small/vac10_small.png"
            },
            {
                text: "(vac11)",
                link: "img/emo_png/vac11.png",
                small: "img/emo_png/small/vac11_small.png"
            },
            {
                text: "(vac12)",
                link: "img/emo_png/vac12.png",
                small: "img/emo_png/small/vac12_small.png"
            }
        ],
        icon: "img/emo_png/small/vac1_small.png",
        inactiveIcon: "img/emo_png/small/vac1_small.png",
        isActive: false
    },
    {
        index: 5,
        smiles: [
            {
                text: "(par1)",
                link: "img/emo_png/par1.png",
                small: "img/emo_png/small/par1_small.png"
            },
            {
                text: "(par2)",
                link: "img/emo_png/par2.png",
                small: "img/emo_png/small/par2_small.png"
            },
            {
                text: "(par3)",
                link: "img/emo_png/par3.png",
                small: "img/emo_png/small/par3_small.png"
            },
            {
                text: "(par4)",
                link: "img/emo_png/par4.png",
                small: "img/emo_png/small/par4_small.png"
            },
            {
                text: "(par5)",
                link: "img/emo_png/par5.png",
                small: "img/emo_png/small/par5_small.png"
            },
            {
                text: "(par6)",
                link: "img/emo_png/par6.png",
                small: "img/emo_png/small/par6_small.png"
            },
            {
                text: "(par7)",
                link: "img/emo_png/par7.png",
                small: "img/emo_png/small/par7_small.png"
            },
            {
                text: "(par8)",
                link: "img/emo_png/par8.png",
                small: "img/emo_png/small/par8_small.png"
            },
            {
                text: "(par9)",
                link: "img/emo_png/par9.png",
                small: "img/emo_png/small/par9_small.png"
            },
            {
                text: "(par10)",
                link: "img/emo_png/par10.png",
                small: "img/emo_png/small/par10_small.png"
            },
            {
                text: "(par11)",
                link: "img/emo_png/par11.png",
                small: "img/emo_png/small/par11_small.png"
            },
            {
                text: "(par12)",
                link: "img/emo_png/par12.png",
                small: "img/emo_png/small/par12_small.png"
            },
            {
                text: "(par13)",
                link: "img/emo_png/par13.png",
                small: "img/emo_png/small/par13_small.png"
            },
            {
                text: "(par14)",
                link: "img/emo_png/par14.png",
                small: "img/emo_png/small/par14_small.png"
            },
            {
                text: "(par15)",
                link: "img/emo_png/par15.png",
                small: "img/emo_png/small/par15_small.png"
            },
            {
                text: "(par16)",
                link: "img/emo_png/par16.png",
                small: "img/emo_png/small/par16_small.png"
            },
            {
                text: "(par17)",
                link: "img/emo_png/par17.png",
                small: "img/emo_png/small/par17_small.png"
            },
            {
                text: "(par18)",
                link: "img/emo_png/par18.png",
                small: "img/emo_png/small/par18_small.png"
            },
            {
                text: "(par19)",
                link: "img/emo_png/par19.png",
                small: "img/emo_png/small/par19_small.png"
            }
        ],
        icon: "img/emo_png/small/par1_small.png",
        inactiveIcon: "img/emo_png/small/par1_small.png",
        isActive: false
    }
];
