const mockStore = {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2U0ZWNhY2E2MmVhNDgyOGM0N2Y5NCIsImlhdCI6MTYxMDAzNTI2NiwiZXhwIjoxNjEwMDM4ODY2fQ.PtJCyt86ibLOKZ2QdUKlErBx55QIdWpQsViyrrMkbFo",
    isAuthenticated: true,
    isLoading: false,
    user: {
      role: "member",
      _id: "5fce4ecaca62ea4828c47f94",
      name: "Member",
      email: "member@gmail.com",
    },
  },
  error: {
    msg: {},
    status: null,
    id: null,
  },
  post: {
    posts: [
      {
        date: "2021-01-04T05:45:27.181Z",
        categoryIds: [
          "5fcf7415dc576e2780f223d3",
          "5fcf7415dc576e2780f223d5",
          "5fcf7415dc576e2780f223d7",
        ],
        _id: "5ff2ab77a49239376c108c41",
        title: "Praesent non orci quis",
        description:
          "Praesent non orci quis augue efficitur facilisis. Donec tempus mattis enim, et laoreet libero venenatis ut. Etiam id nisi feugiat, malesuada libero quis, feugiat velit. Nunc dolor massa, venenatis non lorem non, ultrices vehicula nunc. Donec egestas eu turpis ut consectetur. Proin vel orci quis ligula volutpat iaculis. Mauris et nisi hendrerit, malesuada tellus ac, finibus arcu. In consectetur accumsan commodo. Vestibulum mi est, fermentum quis felis eu, scelerisque sollicitudin nibh. Pellentesque efficitur ultricies justo, sit amet pharetra magna vulputate sit amet. Suspendisse venenatis congue elit, vitae aliquam lacus imperdiet ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Phasellus auctor ante ut orci fringilla ullamcorper.\n\nCurabitur rhoncus enim pulvinar laoreet sodales. Aenean at leo felis. Donec consequat, lorem eget sollicitudin tristique, diam turpis ultricies tortor, quis varius est lacus ac metus. Etiam ante lectus, dapibus nec ipsum non, suscipit scelerisque arcu. Nullam placerat urna turpis, id imperdiet sem condimentum a. Vivamus lobortis magna dolor, nec finibus tortor iaculis et. In pharetra velit enim, at mollis leo iaculis a. Praesent sollicitudin semper tincidunt. Mauris non ex at libero ornare ornare. Suspendisse efficitur lacus nisi, sit amet imperdiet risus porta sit amet. Sed cursus ultrices tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam scelerisque magna quis lectus euismod, non venenatis ligula blandit. Quisque viverra sem a eros convallis, vitae lacinia ligula feugiat.",
        author: "Reporter undefined",
        imageId: "5ff2ab77a49239376c108c42",
      },
      {
        date: "2020-12-30T10:48:03.230Z",
        categoryIds: [
          "5fcf7415dc576e2780f223d4",
          "5fcf7415dc576e2780f223d5",
          "5fcf7415dc576e2780f223d7",
        ],
        _id: "5fec5ae3dff4a577047d3533",
        title: "Lorem ipsum",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis sagittis velit. Mauris rhoncus odio sapien, vitae molestie justo lobortis eu. Fusce semper posuere mauris a tempor. Cras molestie neque in quam mollis, varius vehicula erat porttitor. Etiam imperdiet arcu dapibus, pulvinar lacus quis, maximus quam. In in nibh vel augue sagittis ullamcorper malesuada id eros. Donec finibus turpis vitae enim sollicitudin, a interdum dolor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id metus dignissim, commodo urna a, tempor ex. Proin in dapibus quam. Donec at mauris elementum, eleifend purus in, congue ipsum. Suspendisse tincidunt non est sit amet convallis. Ut vitae ullamcorper tellus, ut pulvinar sem. Fusce pellentesque ultricies nunc, ac elementum mauris volutpat vel. Nulla eget vulputate justo. Donec sit amet interdum risus, quis ultrices justo.\n\nDonec congue nec libero eu congue. Maecenas vitae risus sed mauris dapibus venenatis. Nulla sit amet pulvinar nisi. Morbi a purus sodales, ultricies massa at, luctus libero. Vivamus non lobortis mi. Aliquam sit amet congue quam, a hendrerit lorem. Nam nec sollicitudin justo. Nam scelerisque mollis massa. Praesent ullamcorper sem arcu, et vulputate dolor imperdiet ut. Curabitur at porta orci, vitae luctus mi. Mauris suscipit commodo malesuada. Duis interdum leo libero, quis accumsan purus posuere eu. Donec venenatis urna vitae enim blandit eleifend.",
        author: "Gustavs Jānis Jākobsons",
        imageId: "5fec5ae3dff4a577047d3534",
      },
      {
        date: "2020-12-30T09:35:28.659Z",
        categoryIds: ["5fcf7415dc576e2780f223d8"],
        _id: "5fec49e077e152659888aadc",
        title: "Suspendisse potenti",
        description:
          "Suspendisse potenti. Suspendisse dapibus blandit porttitor. Etiam ultrices tincidunt diam non convallis. Nulla dictum lectus diam, a porta sem tempus non. Quisque sed massa ut justo tincidunt placerat. Fusce eu eleifend mi, in aliquet augue. Aliquam bibendum mauris et auctor lacinia. Curabitur convallis efficitur accumsan. Fusce eget ultricies massa. Donec eros lorem, bibendum nec dapibus et, dictum sit amet dolor.\n\nMaecenas id elit leo. Duis rutrum, nunc in rutrum luctus, tortor felis rutrum felis, sed maximus justo velit id ipsum. Donec augue arcu, imperdiet quis erat eget, sodales mollis purus. Vivamus in est volutpat, commodo sem at, fermentum sapien. Mauris sed dignissim nulla. Praesent non congue mauris, dictum mollis neque. Praesent pellentesque nisi ut ante auctor, sit amet egestas nulla pellentesque. Morbi sodales rutrum ultricies. Praesent est leo, posuere at velit quis, pharetra faucibus risus. Praesent sed laoreet lacus, non molestie lectus. Curabitur risus purus, placerat at diam non, pharetra finibus ipsum. Vivamus rutrum a eros sit amet ultrices. In fermentum enim ante, sit amet interdum sem viverra non. Fusce gravida scelerisque efficitur. Cras sodales tellus augue.\n\nSed dictum felis sit amet auctor maximus. Nunc pellentesque, sapien sed interdum molestie, lacus mi blandit leo, sed pulvinar velit diam sit amet ante. Sed facilisis, dolor ac laoreet imperdiet, ligula tortor maximus mi, vel laoreet ligula eros nec quam. Nulla nec cursus arcu. Nunc lobortis ipsum in risus faucibus, sed sodales enim condimentum. Donec quis porttitor mauris. Vivamus vel mi sed nibh tincidunt tincidunt id vitae lorem. Nunc mattis vitae tellus id consectetur. Nullam dignissim lorem augue, ac accumsan nulla auctor in.",
        author: "Gustavs Jānis Jākobsons",
        imageId: "5fec49e177e152659888aadd",
      },
      {
        date: "2020-12-30T09:36:13.493Z",
        categoryIds: ["5fcf7415dc576e2780f223d5", "5fcf7415dc576e2780f223d6"],
        _id: "5fec4a0d77e152659888aadf",
        title: "Proin nec placerat felis",
        description: "Small Post Text",
        author: "Gustavs Jānis Jākobsons",
        imageId: "5fec4a0d77e152659888aae0",
      },
    ],
    postsLoading: false,
    post: {
      date: "2021-01-04T05:45:27.181Z",
      categoryIds: [
        "5fcf7415dc576e2780f223d3",
        "5fcf7415dc576e2780f223d5",
        "5fcf7415dc576e2780f223d7",
      ],
      _id: "5ff2ab77a49239376c108c41",
      title: "Praesent non orci quis",
      description:
        "Praesent non orci quis augue efficitur facilisis. Donec tempus mattis enim, et laoreet libero venenatis ut. Etiam id nisi feugiat, malesuada libero quis, feugiat velit. Nunc dolor massa, venenatis non lorem non, ultrices vehicula nunc. Donec egestas eu turpis ut consectetur. Proin vel orci quis ligula volutpat iaculis. Mauris et nisi hendrerit, malesuada tellus ac, finibus arcu. In consectetur accumsan commodo. Vestibulum mi est, fermentum quis felis eu, scelerisque sollicitudin nibh. Pellentesque efficitur ultricies justo, sit amet pharetra magna vulputate sit amet. Suspendisse venenatis congue elit, vitae aliquam lacus imperdiet ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Phasellus auctor ante ut orci fringilla ullamcorper.\n\nCurabitur rhoncus enim pulvinar laoreet sodales. Aenean at leo felis. Donec consequat, lorem eget sollicitudin tristique, diam turpis ultricies tortor, quis varius est lacus ac metus. Etiam ante lectus, dapibus nec ipsum non, suscipit scelerisque arcu. Nullam placerat urna turpis, id imperdiet sem condimentum a. Vivamus lobortis magna dolor, nec finibus tortor iaculis et. In pharetra velit enim, at mollis leo iaculis a. Praesent sollicitudin semper tincidunt. Mauris non ex at libero ornare ornare. Suspendisse efficitur lacus nisi, sit amet imperdiet risus porta sit amet. Sed cursus ultrices tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam scelerisque magna quis lectus euismod, non venenatis ligula blandit. Quisque viverra sem a eros convallis, vitae lacinia ligula feugiat.",
      author: "Reporter undefined",
      imageId: "5ff2ab77a49239376c108c42",
      liked: true,
    },
    postLoading: false,
  },
  category: {
    categories: [
      {
        _id: "5fcf7415dc576e2780f223d3",
        name: "Politics",
        color: "red",
        points: 1,
      },
      {
        _id: "5fcf7415dc576e2780f223d4",
        name: "Science",
        color: "cyan",
        points: 6,
      },
      {
        _id: "5fcf7415dc576e2780f223d5",
        name: "Business",
        color: "blue",
        points: 6,
      },
      {
        _id: "5fcf7415dc576e2780f223d6",
        name: "Sports",
        color: "yellow",
        points: 0,
      },
      {
        _id: "5fcf7415dc576e2780f223d7",
        name: "Culture",
        color: "purple",
        points: 8,
      },
      {
        _id: "5fcf7415dc576e2780f223d8",
        name: "Travel",
        color: "green",
        points: 1,
      },
      {
        _id: "5fcf7415dc576e2780f223d9",
        name: "History",
        color: "brown",
        points: 1,
      },
    ],
  },
  comment: {
    comments: [
      {
        date: "2021-01-04T22:55:02.980Z",
        _id: "5ff39cc60696442b98501076",
        postId: "5ff2ab77a49239376c108c41",
        authorId: {
          _id: "5fb7ad4cc05f274010e2c0bb",
          name: "Gustavs Jānis",
          surname: "Jākobsons",
        },
        text:
          "Praesent non orci quis augue efficitur facilisis. Donec tempus mattis enim, et laoreet libero venenatis ut. Etiam id nisi feugiat, malesuada libero quis, feugiat velit. Nunc dolor massa, venenatis non lorem non, ultrices vehicula nunc. Donec egestas eu turpis ut consectetur. Proin vel orci quis ligula volutpat iaculis. Mauris et nisi hendrerit, malesuada tellus ac, finibus arcu. In consectetur accumsan commodo. Vestibulum mi est, fermentum quis felis eu, scelerisque sollicitudin nibh. Pellentesque efficitur ultricies justo, sit amet pharetra magna vulputate sit amet. Suspendisse venenatis congue elit, vitae aliquam lacus imperdiet ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Phasellus auctor ante ut orci fringilla ullamcorper.\n\nPraesent non orci quis augue efficitur facilisis. Donec tempus mattis enim, et laoreet libero venenatis ut. Etiam id nisi feugiat, malesuada libero quis, feugiat velit. Nunc dolor massa, venenatis non lorem non, ultrices vehicula nunc. Donec egestas eu turpis ut consectetur. Proin vel orci quis ligula volutpat iaculis. Mauris et nisi hendrerit, malesuada tellus ac, finibus arcu. In consectetur accumsan commodo. Vestibulum mi est, fermentum quis felis eu, scelerisque sollicitudin nibh. Pellentesque efficitur ultricies justo, sit amet pharetra magna vulputate sit amet. Suspendisse venenatis congue elit, vitae aliquam lacus imperdiet ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Phasellus auctor ante ut orci fringilla ullamcorper.",
      },
      {
        date: "2021-01-04T22:54:51.465Z",
        _id: "5ff39cbb0696442b98501075",
        postId: "5ff2ab77a49239376c108c41",
        authorId: {
          _id: "5fb7ad4cc05f274010e2c0bb",
          name: "Gustavs Jānis",
          surname: "Jākobsons",
        },
        text:
          "Praesent non orci quis augue efficitur facilisis. Donec tempus mattis enim, et laoreet libero venenatis ut. Etiam id nisi feugiat, malesuada libero quis, feugiat velit. Nunc dolor massa, venenatis non lorem non, ultrices vehicula nunc. Donec egestas eu turpis ut consectetur. Proin vel orci quis ligula volutpat iaculis. Mauris et nisi hendrerit, malesuada tellus ac, finibus arcu. In consectetur accumsan commodo. Vestibulum mi est, fermentum quis felis eu, scelerisque sollicitudin nibh. Pellentesque efficitur ultricies justo, sit amet pharetra magna vulputate sit amet. Suspendisse venenatis congue elit, vitae aliquam lacus imperdiet ac. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Phasellus auctor ante ut orci fringilla ullamcorper.",
      },
    ],
  },
};

export default mockStore;
