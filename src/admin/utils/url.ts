import { baseUrl } from "../../lib/utils.ts";

// export default BASEURL = "https://schooledgecbtapi-e4804672405c.herokuapp.com/"
export const BASEURL = () => {
  return baseUrl + `/`;
};
export const SINGLEBASEURL = () => {
  return baseUrl;
};
