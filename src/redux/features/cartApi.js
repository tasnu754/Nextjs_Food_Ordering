import { rootApi } from "../apiSlice";

const cartApi = rootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({}),
});

export const {} = cartApi;
