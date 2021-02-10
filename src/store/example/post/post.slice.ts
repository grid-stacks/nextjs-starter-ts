import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";

export const POST_SLICE_KEY = "post";

// Define a service using a base URL and expected endpoints
export const postSlice = createApi({
	reducerPath: POST_SLICE_KEY,
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com/",
	}),
	endpoints: (builder) => ({
		getTodos: builder.query({
			query: () => "todos",
		}),
		getTodo: builder.query({
			query: (id: number) => `todos/${id}`,
		}),
	}),
});

export const { useGetTodosQuery, useGetTodoQuery } = postSlice;
