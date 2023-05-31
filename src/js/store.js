import { createStore } from "framework7";

const store = createStore({
   state: {
      "faa9905e-dea8-4c7f-8eb4-98f1e6e66506": {
         loading: false,
         hasMore: true,
         records: [],
      },
      "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5": {
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
      "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"({ state }) {
         return state["19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5"];
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
         let data = [];
         if (id == "faa9905e-dea8-4c7f-8eb4-98f1e6e66506") {
            data = [
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
                  Country: "02f7e763-61d1-4f24-8ad2-98b4b6609be9",
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
                  Country: "23e71267-7ad0-43a0-8ab4-05fff7fb0bd0",
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
                  Country: "2899a626-01c5-4ce1-a627-a23483149e75",
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
                  Country: "23e71267-7ad0-43a0-8ab4-05fff7fb0bd0",
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
                  Country: "706dcf79-9480-4249-8b31-68ccba50e362",
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
                  Country: "852bbfde-5e32-43aa-a734-5f712dba7d56",
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
                  Country: "852bbfde-5e32-43aa-a734-5f712dba7d56",
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
                  Country: "77e1ccba-0664-407c-bbc7-90aefbd4b6da",
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
                  Country: "78341623-161f-45b5-9360-e9e334b24def",
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
                  Country: "bb5a3ed3-9f9f-4908-b7d6-0aa7e4db76ff",
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
                  Country: "5e43f169-fed7-464e-b8b6-e790a96a43c1",
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
                  Country: "02f7e763-61d1-4f24-8ad2-98b4b6609be9",
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
                  Country: "23e71267-7ad0-43a0-8ab4-05fff7fb0bd0",
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
                  Country: "2899a626-01c5-4ce1-a627-a23483149e75",
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
                  Country: "23e71267-7ad0-43a0-8ab4-05fff7fb0bd0",
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
                  Country: "706dcf79-9480-4249-8b31-68ccba50e362",
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
                  Country: "852bbfde-5e32-43aa-a734-5f712dba7d56",
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
                  Country: "852bbfde-5e32-43aa-a734-5f712dba7d56",
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
                  Country: "77e1ccba-0664-407c-bbc7-90aefbd4b6da",
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
                  Country: "78341623-161f-45b5-9360-e9e334b24def",
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
                  Country: "bb5a3ed3-9f9f-4908-b7d6-0aa7e4db76ff",
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
                  Country: "5e43f169-fed7-464e-b8b6-e790a96a43c1",
               },
            ];
            // simulate the loading so we can know the loading cursor code is working
            setTimeout(function () {
               state[id] = {
                  loading: false,
                  hasMore:
                     state[id].records.length + data.length >= 60
                        ? false
                        : true,
                  records: [...state[id].records, ...data],
               };
            }, 1000);
         } else if (id == "19e566e3-a6b0-4ed5-83ea-a42b1ddbf5c5") {
            data = [
               {
                  uuid: "02f7e763-61d1-4f24-8ad2-98b4b6609be9",
                  created_at: "2023-05-27T07:58:42.000Z",
                  updated_at: "2023-05-27T07:58:42.000Z",
                  properties: null,
                  Name: "Singapore",
               },
               {
                  uuid: "23e71267-7ad0-43a0-8ab4-05fff7fb0bd0",
                  created_at: "2023-05-27T07:58:26.000Z",
                  updated_at: "2023-05-27T07:58:26.000Z",
                  properties: null,
                  Name: "Laos",
               },
               {
                  uuid: "2899a626-01c5-4ce1-a627-a23483149e75",
                  created_at: "2023-05-27T07:58:21.000Z",
                  updated_at: "2023-05-27T07:58:21.000Z",
                  properties: null,
                  Name: "Indonesia",
               },
               {
                  uuid: "5e43f169-fed7-464e-b8b6-e790a96a43c1",
                  created_at: "2023-05-27T07:58:11.000Z",
                  updated_at: "2023-05-27T07:58:11.000Z",
                  properties: null,
                  Name: "Timor-Leste",
               },
               {
                  uuid: "706dcf79-9480-4249-8b31-68ccba50e362",
                  created_at: "2023-05-27T07:58:04.000Z",
                  updated_at: "2023-05-27T07:58:04.000Z",
                  properties: null,
                  Name: "Cambodia",
               },
               {
                  uuid: "77e1ccba-0664-407c-bbc7-90aefbd4b6da",
                  created_at: "2023-05-27T07:57:52.000Z",
                  updated_at: "2023-05-27T07:57:52.000Z",
                  properties: null,
                  Name: "Brunei",
               },
               {
                  uuid: "78341623-161f-45b5-9360-e9e334b24def",
                  created_at: "2023-05-27T07:58:47.000Z",
                  updated_at: "2023-05-27T07:58:47.000Z",
                  properties: null,
                  Name: "Thailand",
               },
               {
                  uuid: "7cebd836-ef0e-4923-a26e-f73db74f1a55",
                  created_at: "2023-05-27T07:58:52.000Z",
                  updated_at: "2023-05-27T07:58:52.000Z",
                  properties: null,
                  Name: "Vietnam",
               },
               {
                  uuid: "852bbfde-5e32-43aa-a734-5f712dba7d56",
                  created_at: "2023-05-27T07:58:37.000Z",
                  updated_at: "2023-05-27T07:58:37.000Z",
                  properties: null,
                  Name: "Philippines",
               },
               {
                  uuid: "bb5a3ed3-9f9f-4908-b7d6-0aa7e4db76ff",
                  created_at: "2023-05-27T07:57:58.000Z",
                  updated_at: "2023-05-27T07:57:58.000Z",
                  properties: null,
                  Name: "Burma",
               },
               {
                  uuid: "ee527d83-0150-4467-a483-951a3808dcd2",
                  created_at: "2023-05-27T07:58:32.000Z",
                  updated_at: "2023-05-27T07:58:32.000Z",
                  properties: null,
                  Name: "Malaysia",
               },
            ];
            // simulate the loading so we can know the loading cursor code is working
            setTimeout(function () {
               state[id] = {
                  loading: false,
                  hasMore: false,
                  records: data,
               };
            }, 1000);
         }
      },
      updateRecord({ state }, props) {
         let records = [...state[props.dcID].records];
         let foundIndex = records.findIndex((x) => x.uuid == props.recordID);
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
