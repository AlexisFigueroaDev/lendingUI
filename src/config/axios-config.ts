import axios, {AxiosInstance} from 'axios';
export const api: AxiosInstance = axios.create({
  baseURL: 'https://mobile.qa.personalpay.dev/fin_sol',
  timeout: 30000,
  headers: {
    Authorization:
      'eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiTFJHRHdja0tmRlJ2bWNLZUtrME1JUSIsInN1YiI6IjE2NjkwMmUzLTA1OTYtNDdlMi1hM2I0LWQ2MDRlYWY2YzQxYSIsImF1ZGl0VHJhY2tpbmdJZCI6ImNkYWJhMzFiLTNmNTUtNDQ5NS04YzMyLTkxNjUyYzNmMmZhYy02ODQxODM0Iiwic3VibmFtZSI6IjE2NjkwMmUzLTA1OTYtNDdlMi1hM2I0LWQ2MDRlYWY2YzQxYSIsImlzcyI6Imh0dHBzOi8vaWRwc2VzaW9udC50ZWxlY29tLmNvbS5hcjo0NDMvb3BlbmFtL29hdXRoMi9maW50ZWNoLWFwcCIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwic2lkIjoiR0t0aE5sZWVkcFF6YkN3Y241MGgzYStOdmxwTXJYT2twdDlYNlpYbS9zZz0iLCJhdWQiOiJmaW50ZWNoLWFwcC1iZmYtcWEiLCJjX2hhc2giOiJkUWp1MUhvSkgyZ1RMNDhMOTVGUzZRIiwiYWNyIjoibWFnaWNMaW5rVmFsaWRhdGlvbiIsIm9yZy5mb3JnZXJvY2sub3BlbmlkY29ubmVjdC5vcHMiOiJsX3QxV1F4UGR3U1dyYTZBQlFXc0x2OGRNbm8iLCJzX2hhc2giOiJYY3F5aUNoVWp6UTZSdjZoek9Jcm13IiwiYXpwIjoiZmludGVjaC1hcHAtYmZmLXFhIiwiYXV0aF90aW1lIjoxNzI4MzM0MDk1LCJuYW1lIjoiMTY2OTAyZTMtMDU5Ni00N2UyLWEzYjQtZDYwNGVhZjZjNDFhIiwicmVhbG0iOiIvZmludGVjaC1hcHAiLCJyZWdpc3RyYXRpb24iOiJtYWdpY2xpbmsiLCJleHAiOjE3MjgzMzc2OTcsInRva2VuVHlwZSI6IkpXVFRva2VuIiwiaWF0IjoxNzI4MzM0MDk3LCJmYW1pbHlfbmFtZSI6ImFsZXhmaWd1ZXJvYS5xYTNAZ21haWwuY29tIiwiZW1haWwiOiJhbGV4ZmlndWVyb2EucWEzQGdtYWlsLmNvbSJ9.pP0JitO3UUN6xgIXNQxaZQAxDkXr55KjDNjy-nU1SeVOYJY2S0OPAOd48sOkTwjibSLSNFjkfnnlGnwFNXKv1elyYoWop63Ih7HkeKQw6Hdb0sGiur6nzH2CHir4AXhJpQsX6LSL-8ClKYYb8HGFwpuUQcQsN8gD0rZlgPXIzN4xbGQkZgXqdP49j6iiRnQbiYdHBy05bwFURt1dA3njN81RKEgNJGTquTmcFCzfBcjglVkjkfULI05HC5dHSRk6xmgtf1jrDBXaz-OXa5uv_J06_qVOIqzxF3G7Qnt-vcSfEzJ5He1BJifdtcKe81iiu-5nxuQpPMZJq0rzN9XITg',
  },
});
const globalResponseMechanism = {
  onFulfilled: (response: any) => {
    return response.data;
  },
  onReject: (error: any) => {
    return Promise.reject(error);
  },
};

api.interceptors.response.use(
  globalResponseMechanism.onFulfilled,
  globalResponseMechanism.onReject,
);

const METHODS = ['get', 'put', 'post', 'patch', 'delete'];

const httpMethods = METHODS.map(
  method =>
    (url: string, requestConfig = {}, customTimeout = 10000) => {
      const request = {
        url,
        method,
        ...requestConfig,
      };

      return api.request(request).finally(() => {
        clearTimeout(customTimeout);
      });
    },
);

export const [get, put, post, patch, del] = httpMethods;
