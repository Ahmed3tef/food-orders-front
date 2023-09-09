import axios from "axios";
import { APIBase } from "./api";

const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiYzBiNWI3MjIyNjk1ZTg5ZGVhMjQ0YzA2YTg1ZDY3MTFjOWMwOGY5ZjA4ODI1OGMxNjQ3MjUyNzNiNTYzMDQiLCJ0eXBlIjo2LCJpYXQiOjE2NzE4ODQ3OTAsImV4cCI6MTY3MjQ4OTU5MH0.HHk1EpVdO-1tTpC2k4IaTzIEjcgnnyOGq2ZJb7x6jUQ`;

const config = {
  headers: {
    Authorization: token ? token : "",
  },
};
export default async function loadData(thunkAPI, path, token) {
  const authConfig = {
    headers: {
      Authorization: token
        ? token
        : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiYzBiNWI3MjIyNjk1ZTg5ZGVhMjQ0YzA2YTg1ZDY3MTFjOWMwOGY5ZjA4ODI1OGMxNjQ3MjUyNzNiNTYzMDQiLCJ0eXBlIjo2LCJpYXQiOjE2NzE4ODQ3OTAsImV4cCI6MTY3MjQ4OTU5MH0.HHk1EpVdO-1tTpC2k4IaTzIEjcgnnyOGq2ZJb7x6jUQ",
    },
  };

  return axios
    .get(`${APIBase}${path}`, authConfig ? authConfig : config, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function loadDataWithId(thunkAPI, path, id) {
  const configId = {
    headers: {
      Authorization: token,
    },
    params: {
      catId: id,
    },
  };
  return axios
    .get(`${APIBase}${path}`, configId, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function getDataWithParams(thunkAPI, path, params, token) {
  const config = {
    headers: {
      Authorization: token ? token : "",
    },
    params,
  };
  return axios
    .get(`${APIBase}${path}`, config, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function loadDataWithParams(thunkAPI, path, params, data, token) {
  const config = {
    headers: {
      Authorization: token,
    },
    params,
  };
  return axios
    .post(`${APIBase}${path}`, data, config, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}

export async function sendSubmitOrder(path, data) {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .post(`${APIBase}${path}`, data, config, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
