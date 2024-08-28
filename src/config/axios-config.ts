import axios, {AxiosInstance} from 'axios';
export const api: AxiosInstance = axios.create({
  baseURL: 'https://qa.personalpay.dev',
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/json',
    Authorization:
      'eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiVzdDNDU4NWdycWp4c3VNSE9kT3ppUSIsInN1YiI6IjE2NjkwMmUzLTA1OTYtNDdlMi1hM2I0LWQ2MDRlYWY2YzQxYSIsImF1ZGl0VHJhY2tpbmdJZCI6IjkxOTY2OTcwLTg3ODMtNDgwOC1hNTg2LWRiZDExZmNiMmQ0NC00NDMyOTU4Iiwic3VibmFtZSI6IjE2NjkwMmUzLTA1OTYtNDdlMi1hM2I0LWQ2MDRlYWY2YzQxYSIsImlzcyI6Imh0dHBzOi8vaWRwc2VzaW9udC50ZWxlY29tLmNvbS5hcjo0NDMvb3BlbmFtL29hdXRoMi9maW50ZWNoLWFwcCIsInRva2VuTmFtZSI6ImlkX3Rva2VuIiwic2lkIjoiQyt6bFByYUY2citMU0NHUEhDMkI0LzJReksvTEpaRjY1UThNWUhyYWhPWT0iLCJhdWQiOiJmaW50ZWNoLWFwcC1iZmYtcWEiLCJjX2hhc2giOiI0b0R3b1Q5ejJUTmpUakNpdmw3NHJBIiwiYWNyIjoibWFnaWNMaW5rVmFsaWRhdGlvbiIsIm9yZy5mb3JnZXJvY2sub3BlbmlkY29ubmVjdC5vcHMiOiJvWTBLaHk3N3JPdlVsNnVzelpobFFOVGhqTW8iLCJzX2hhc2giOiJjaEIySjRZOE1laVhJNldmUTRnMU13IiwiYXpwIjoiZmludGVjaC1hcHAtYmZmLXFhIiwiYXV0aF90aW1lIjoxNzIzNDc3OTAzLCJuYW1lIjoiMTY2OTAyZTMtMDU5Ni00N2UyLWEzYjQtZDYwNGVhZjZjNDFhIiwicmVhbG0iOiIvZmludGVjaC1hcHAiLCJyZWdpc3RyYXRpb24iOiJtYWdpY2xpbmsiLCJleHAiOjE3MjM0ODE1MDQsInRva2VuVHlwZSI6IkpXVFRva2VuIiwiaWF0IjoxNzIzNDc3OTA0LCJmYW1pbHlfbmFtZSI6ImFsZXhmaWd1ZXJvYS5xYTNAZ21haWwuY29tIiwiZW1haWwiOiJhbGV4ZmlndWVyb2EucWEzQGdtYWlsLmNvbSJ9.HxRluNptsg4rK3y88M2wTlA3ZFsYg7aLwHm8NWyeDbMnvH1-MwFPbuqKNs-VNNrkvnGj9kMWIBuo9j1RnMzRNV11YcC_IemGXATQsVPinC-aUaTqUMS7SS1Hvq6Ec2JXQzewzA9HQf5QDHtKnB4y1n4IYlL41JGhqzAnFq5U9XNWwXfTmwXy-nTDoqmayXZEy1PkA6zFJu3Ic0t6RIb_feUamn_6_odvRc2RAk2W1ri8YzDhP4tkDL63Yu_Lb3HyWI_9Jy2UTnBj5AdvD27Rev5oOD6ytx1DYZsSBVBjRPPnX4Wc-uWPdQoXhjehR_EUmNqS_x_3gWAxlDoY4bmbGg',
  },
});
/**
 *
 * 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlY2I3MmY0ZC05OTE0LTRjNzMtYTFkYi1mZjg2MzA1OWM5NGUiLCJpYXQiOjE3MjI0NjU0NTJ9.y0J76xk7rjxq2WjfqxPTM_oPqwve8nhEl1W3F9uzwtw',
 */
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
