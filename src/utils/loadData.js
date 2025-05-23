import Papa from "papaparse";

export const loadCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: reject,
    });
  });
};