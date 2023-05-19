import { createStore } from "framework7";

const store = createStore({
  state: {
    "faa9905e-dea8-4c7f-8eb4-98f1e6e66506": [],
    products: [
      {
        id: "1",
        title: "Apple iPhone 8",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.",
      },
      {
        id: "2",
        title: "Apple iPhone 8 Plus",
        description:
          "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!",
      },
      {
        id: "3",
        title: "Apple iPhone X",
        description:
          "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.",
      },
    ],
  },
  getters: {
    "faa9905e-dea8-4c7f-8eb4-98f1e6e66506"({ state }) {
      return state["faa9905e-dea8-4c7f-8eb4-98f1e6e66506"];
    },
    products({ state }) {
      return state.products;
    },
  },
  actions: {
    getAppBuilderData({ state }, id) {
      state[id] = [
        {
          uuid: "37d190ae-22d5-4bbb-ad57-5984c1ac356c",
          created_at: "2023-05-18T10:07:19.000Z",
          updated_at: "2023-05-18T10:07:19.000Z",
          properties: null,
          Name: "James Duncan",
          Email: "james@digiserve.org",
          URL: "https://ssmfi.org/missionary/james-and-laurie-duncan/",
          Phone: "+66 61 803-9090",
          Gender: "Male",
          Birthday: "1982-11-06T00:00:00.000Z",
          Toggle: 1,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id: "37d190ae-22d5-4bbb-ad57-5984c1ac356c",
        },
        {
          uuid: "38fc0ab1-5d30-497d-abc7-1fd8807373bb",
          created_at: "2023-05-19T06:35:05.000Z",
          updated_at: "2023-05-19T06:35:05.000Z",
          properties: null,
          Name: "Johnny",
          Email: "johnny@digiserve.org",
          URL: "",
          Phone: "",
          Gender: "Male",
          Birthday: "1976-07-02T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is the biography text.",
          id: "38fc0ab1-5d30-497d-abc7-1fd8807373bb",
        },
        {
          uuid: "cc4bf43f-a597-4556-9eb5-b18e019440b8",
          created_at: "2023-05-19T06:35:45.000Z",
          updated_at: "2023-05-19T06:35:45.000Z",
          properties: null,
          Name: "Laurie",
          Email: "laurie.michele.duncan@gmail.com",
          URL: "https://ssmfi.org/missionary/james-and-laurie-duncan/",
          Phone: "+66 61 803-9990",
          Gender: "Female",
          Birthday: "1983-03-23T00:00:00.000Z",
          Toggle: 1,
          Slider: 50,
          Bio: "This is a space for long text to be inserted.",
          id: "cc4bf43f-a597-4556-9eb5-b18e019440b8",
        },
      ];
    },
    addProduct({ state }, product) {
      state.products = [...state.products, product];
    },
  },
});
export default store;
