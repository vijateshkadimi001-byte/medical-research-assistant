import api from "./api";

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deletePDF() {
  const response = await api.delete("/upload");
  return response.data;
}