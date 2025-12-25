import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, message?: string) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonColor: "#2563eb",
    timer: 2000,
    timerProgressBar: true,
  });
};

export const showErrorAlert = (title: string, message?: string) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonColor: "#2563eb",
  });
};

export const showWarningAlert = (title: string, message?: string) => {
  return Swal.fire({
    icon: "warning",
    title: title,
    text: message,
    confirmButtonColor: "#2563eb",
  });
};

export const showInfoAlert = (title: string, message?: string) => {
  return Swal.fire({
    icon: "info",
    title: title,
    text: message,
    confirmButtonColor: "#2563eb",
  });
};

export const showConfirmAlert = async (
  title: string,
  message?: string,
  confirmText = "Yes",
  cancelText = "No"
) => {
  const result = await Swal.fire({
    icon: "question",
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#64748b",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
  return result.isConfirmed;
};

export const showLoadingAlert = (title: string, message?: string) => {
  return Swal.fire({
    title: title,
    text: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};
