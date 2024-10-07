import axios, {AxiosInstance} from 'axios';
export const api: AxiosInstance = axios.create({
  baseURL: 'https://mobile.qa.personalpay.dev/fin_sol',
  timeout: 30000,
  headers: {
    Authorization:
      'eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiVWdWemFMS1JBbDhJOTM5akUtaEpVQSIsInN1YiI6IjE2NjkwMmUzLTA1OTYtNDdlMi1hM2I0LWQ2MDRlYWY2YzQxYSIsImF1ZGl0VHJhY2tpbmdJZCI6ImNkYWJhMzFiLTNmNTUtNDQ5NS04YzMyLTkxNjUyYzNmMmZhYy02NzkyMjA1Iiwic3VibmFtZSI6IjE2NjkwMmUzLTA1OTYtNDdlMi1hM2I0LWQ2MDRlYWY2YzQxYSIsImlzcyI6Imh0dHBzOi8vaWRwc2VzaW9udC50ZWxlY29tLmNvbS5hcjo0NDMvb3BlbmFtL29hdXRoMi9maW50ZWNoLWFwcCIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwic2lkIjoiQWpyTGROQzArV0ZEV2xwSFhna25JVnBSM2RoM1Vkc0VmWE5yeWdVdmRNTT0iLCJhdWQiOiJmaW50ZWNoLWFwcC1iZmYtcWEiLCJjX2hhc2giOiI3X015ZzZOTW9Qai1ZT29XOTI3MVh3IiwiYWNyIjoibWFnaWNMaW5rVmFsaWRhdGlvbiIsIm9yZy5mb3JnZXJvY2sub3BlbmlkY29ubmVjdC5vcHMiOiI3eTdPMEtEc3E4OXJqN0dJTXJBVkswQ3BRNTgiLCJzX2hhc2giOiJWdHI5XzRFbXhuRUgyOGFINnNsTF9BIiwiYXpwIjoiZmludGVjaC1hcHAtYmZmLXFhIiwiYXV0aF90aW1lIjoxNzI4MzIxNTg5LCJuYW1lIjoiMTY2OTAyZTMtMDU5Ni00N2UyLWEzYjQtZDYwNGVhZjZjNDFhIiwicmVhbG0iOiIvZmludGVjaC1hcHAiLCJyZWdpc3RyYXRpb24iOiJtYWdpY2xpbmsiLCJleHAiOjE3MjgzMjUxOTAsInRva2VuVHlwZSI6IkpXVFRva2VuIiwiaWF0IjoxNzI4MzIxNTkwLCJmYW1pbHlfbmFtZSI6ImFsZXhmaWd1ZXJvYS5xYTNAZ21haWwuY29tIiwiZW1haWwiOiJhbGV4ZmlndWVyb2EucWEzQGdtYWlsLmNvbSJ9.SmYJwycYv2KrOTmn27Iu5treR9EbSBvETzwEUiw1KqqXefxLvVxJSJga5uYTSOCX5IRusE9xfmBPZD5dU0kW5LL1noEvwXbinqL-MsRH6oearSgDAtBjfvk8w6lJIH0uOlDO54b3ODFp7d-E3rcIBePgezk0iRlwf1fzZBoXXyNwzZzL1lp3adK49PZrHwF1vXote308SsQsvBvm0IJVTha23M9e-PnBUi6E-mK6lPXzHK0HHRDu3ToFsfbgdThjExcMlxOZ9_fCx3c2vI_r_yfQAk6f-GMIgub9UHRIBBZH3WAjKICdj3stH5YOzcXCfkq9TPwhT8uvE1WTVnkkfQ',
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
