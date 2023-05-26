import { createStore } from "framework7";

const store = createStore({
  state: {
    "faa9905e-dea8-4c7f-8eb4-98f1e6e66506": {
      loading: false,
      hasMore: true,
      records: [],
    },
    version: "",
  },
  getters: {
    "faa9905e-dea8-4c7f-8eb4-98f1e6e66506"({ state }) {
      return state["faa9905e-dea8-4c7f-8eb4-98f1e6e66506"];
    },
    version({ state }) {
      return state.version;
    },
  },
  actions: {
    getAppBuilderData({ state }, id) {
      if (state[id].loading) return false;
      // let DC = AB.datacollectionByID(id)
      // DC.setState(state);
      // DC.loadMore()
      //
      // IN our DC, after we receive data, internally set the state:
      // .then((data) => {
      //    state[id] == { hasMore: true/false, records: [...state[id], ...data] };
      // })
      state[id].loading = true;
      const data = [
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "1e8d8385-28ba-49f5-8bc4-84a96413b30a",
          created_at: "2023-05-23T06:21:33.000Z",
          updated_at: "2023-05-23T06:21:33.000Z",
          properties: null,
          Name: "Capen Duncan",
          Email: "capen@duncan.com",
          URL: "https://capen.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2014-03-09T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "1e8d8385-28ba-49f5-8bc4-84a96413b30a",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "2277ccaf-7e8b-4cf1-85a1-a989a911bd99",
          created_at: "2023-05-23T06:22:31.000Z",
          updated_at: "2023-05-23T06:22:31.000Z",
          properties: null,
          Name: "Wil Graham Duncan",
          Email: "wil@duncan.com",
          URL: "https://wil.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2018-10-10T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "2277ccaf-7e8b-4cf1-85a1-a989a911bd99",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "37d190ae-22d5-4bbb-ad57-5984c1ac356c",
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
          id:
            Math.ceil(1000000 * Math.random()) +
            "37d190ae-22d5-4bbb-ad57-5984c1ac356c",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "38fc0ab1-5d30-497d-abc7-1fd8807373bb",
          created_at: "2023-05-19T06:35:05.000Z",
          updated_at: "2023-05-19T06:35:05.000Z",
          properties: null,
          Name: "Johnny Hausman",
          Email: "johnny@digiserve.org",
          URL: "",
          Phone: "",
          Gender: "Male",
          Birthday: "1976-07-02T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is the biography text.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "38fc0ab1-5d30-497d-abc7-1fd8807373bb",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "39423609-61fe-40f3-9c5b-5dd6e1ed6f9b",
          created_at: "2023-05-23T06:18:50.000Z",
          updated_at: "2023-05-23T06:18:50.000Z",
          properties: null,
          Name: "Lily Duncan",
          Email: "lily@duncan.com",
          URL: "https://lily.duncan.com",
          Phone: "",
          Gender: "Female",
          Birthday: "2004-04-24T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "39423609-61fe-40f3-9c5b-5dd6e1ed6f9b",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "3d6dcf2d-1bec-4a2e-82ba-7ea5f02020a5",
          created_at: "2023-05-23T06:22:07.000Z",
          updated_at: "2023-05-23T06:22:07.000Z",
          properties: null,
          Name: "Asher Duncan",
          Email: "asher@duncan.com",
          URL: "https://asher.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2016-05-14T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "3d6dcf2d-1bec-4a2e-82ba-7ea5f02020a5",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "950b14f6-38af-418f-bcf9-7832da18faab",
          created_at: "2023-05-23T06:22:58.000Z",
          updated_at: "2023-05-23T06:22:58.000Z",
          properties: null,
          Name: "Mable Duncan",
          Email: "mable@duncan.com",
          URL: "https://mable.duncan.com",
          Phone: "",
          Gender: "Female",
          Birthday: "2020-12-06T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "950b14f6-38af-418f-bcf9-7832da18faab",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "cc4bf43f-a597-4556-9eb5-b18e019440b8",
          created_at: "2023-05-19T06:35:45.000Z",
          updated_at: "2023-05-19T06:35:45.000Z",
          properties: null,
          Name: "Laurie Duncan",
          Email: "laurie.michele.duncan@gmail.com",
          URL: "https://ssmfi.org/missionary/james-and-laurie-duncan/",
          Phone: "+66 61 803-9990",
          Gender: "Female",
          Birthday: "1983-03-23T00:00:00.000Z",
          Toggle: 1,
          Slider: 50,
          Bio: "This is a space for long text to be inserted.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "cc4bf43f-a597-4556-9eb5-b18e019440b8",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "eb84838d-9b84-48f0-baf8-f6f6bb4acdf3",
          created_at: "2023-05-23T06:20:35.000Z",
          updated_at: "2023-05-23T06:20:35.000Z",
          properties: null,
          Name: "Noah Duncan",
          Email: "noah@duncan.com",
          URL: "https://noah.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2008-08-02T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "eb84838d-9b84-48f0-baf8-f6f6bb4acdf3",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "fc912500-ad26-43db-9e3f-9550cbc7286e",
          created_at: "2023-05-23T06:21:01.000Z",
          updated_at: "2023-05-23T06:21:01.000Z",
          properties: null,
          Name: "Johsen Duncan",
          Email: "johsen@duncan.com",
          URL: "https://johsen.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2012-02-21T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "fc912500-ad26-43db-9e3f-9550cbc7286e",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "fd0f41b0-8d0b-4d1f-a975-ccebe8a9a8d0",
          created_at: "2023-05-23T06:19:29.000Z",
          updated_at: "2023-05-23T06:19:29.000Z",
          properties: null,
          Name: "Evlee Duncan",
          Email: "evlee@duncan.com",
          URL: "https://evlee.duncan.com",
          Phone: null,
          Gender: "Female",
          Birthday: "2007-01-10T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "fd0f41b0-8d0b-4d1f-a975-ccebe8a9a8d0",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "1e8d8385-28ba-49f5-8bc4-84a96413b30a",
          created_at: "2023-05-23T06:21:33.000Z",
          updated_at: "2023-05-23T06:21:33.000Z",
          properties: null,
          Name: "Capen Duncan",
          Email: "capen@duncan.com",
          URL: "https://capen.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2014-03-09T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "1e8d8385-28ba-49f5-8bc4-84a96413b30a",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "2277ccaf-7e8b-4cf1-85a1-a989a911bd99",
          created_at: "2023-05-23T06:22:31.000Z",
          updated_at: "2023-05-23T06:22:31.000Z",
          properties: null,
          Name: "Wil Graham Duncan",
          Email: "wil@duncan.com",
          URL: "https://wil.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2018-10-10T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "2277ccaf-7e8b-4cf1-85a1-a989a911bd99",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "37d190ae-22d5-4bbb-ad57-5984c1ac356c",
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
          id:
            Math.ceil(1000000 * Math.random()) +
            "37d190ae-22d5-4bbb-ad57-5984c1ac356c",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "38fc0ab1-5d30-497d-abc7-1fd8807373bb",
          created_at: "2023-05-19T06:35:05.000Z",
          updated_at: "2023-05-19T06:35:05.000Z",
          properties: null,
          Name: "Johnny Hausman",
          Email: "johnny@digiserve.org",
          URL: "",
          Phone: "",
          Gender: "Male",
          Birthday: "1976-07-02T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is the biography text.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "38fc0ab1-5d30-497d-abc7-1fd8807373bb",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "39423609-61fe-40f3-9c5b-5dd6e1ed6f9b",
          created_at: "2023-05-23T06:18:50.000Z",
          updated_at: "2023-05-23T06:18:50.000Z",
          properties: null,
          Name: "Lily Duncan",
          Email: "lily@duncan.com",
          URL: "https://lily.duncan.com",
          Phone: "",
          Gender: "Female",
          Birthday: "2004-04-24T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "39423609-61fe-40f3-9c5b-5dd6e1ed6f9b",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "3d6dcf2d-1bec-4a2e-82ba-7ea5f02020a5",
          created_at: "2023-05-23T06:22:07.000Z",
          updated_at: "2023-05-23T06:22:07.000Z",
          properties: null,
          Name: "Asher Duncan",
          Email: "asher@duncan.com",
          URL: "https://asher.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2016-05-14T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "3d6dcf2d-1bec-4a2e-82ba-7ea5f02020a5",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "950b14f6-38af-418f-bcf9-7832da18faab",
          created_at: "2023-05-23T06:22:58.000Z",
          updated_at: "2023-05-23T06:22:58.000Z",
          properties: null,
          Name: "Mable Duncan",
          Email: "mable@duncan.com",
          URL: "https://mable.duncan.com",
          Phone: "",
          Gender: "Female",
          Birthday: "2020-12-06T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "950b14f6-38af-418f-bcf9-7832da18faab",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "cc4bf43f-a597-4556-9eb5-b18e019440b8",
          created_at: "2023-05-19T06:35:45.000Z",
          updated_at: "2023-05-19T06:35:45.000Z",
          properties: null,
          Name: "Laurie Duncan",
          Email: "laurie.michele.duncan@gmail.com",
          URL: "https://ssmfi.org/missionary/james-and-laurie-duncan/",
          Phone: "+66 61 803-9990",
          Gender: "Female",
          Birthday: "1983-03-23T00:00:00.000Z",
          Toggle: 1,
          Slider: 50,
          Bio: "This is a space for long text to be inserted.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "cc4bf43f-a597-4556-9eb5-b18e019440b8",
        },
        {
          uuid:
            Math.ceil(1000000 * Math.random()) +
            "eb84838d-9b84-48f0-baf8-f6f6bb4acdf3",
          created_at: "2023-05-23T06:20:35.000Z",
          updated_at: "2023-05-23T06:20:35.000Z",
          properties: null,
          Name: "Noah Duncan",
          Email: "noah@duncan.com",
          URL: "https://noah.duncan.com",
          Phone: "",
          Gender: "Male",
          Birthday: "2008-08-02T00:00:00.000Z",
          Toggle: 0,
          Slider: 50,
          Bio: "This is where a lot of text can be put.",
          id:
            Math.ceil(1000000 * Math.random()) +
            "eb84838d-9b84-48f0-baf8-f6f6bb4acdf3",
        },
      ];
      // simulate the loading so we can know the loading cursor code is working
      setTimeout(function () {
        state[id] = {
          loading: false,
          hasMore: state[id].records.length + data.length >= 60 ? false : true,
          records: [...state[id].records, ...data],
        };
      }, 1000);
    },
    updateRecord({ state }, props) {
      let records = [...state[props.dcID].records];
      let foundIndex = records.findIndex((x) => x.id == props.recordID);
      let recordToUpdate = records[foundIndex];

      for (var propt in props.record) {
        if (recordToUpdate.hasOwnProperty(propt))
          recordToUpdate[propt] = props.record[propt];
      }
      state[props.dcID] = {
        loading: false,
        hasMore: records.length >= 60 ? false : true,
        records: records,
      };
    },
    getVersion({ state }) {
      state.version = app.f7.params.version;
    },
  },
});
export default store;
