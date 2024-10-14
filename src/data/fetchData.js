import { error } from "@jswork/next";

async function sectionDocument(token) {
  const url =
    "https://xynydxu4qi.us-east-2.awsapprunner.com/api/section-type-document";
  const document = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return document;
}

async function postFileAsynId(fileUrl, typeId, token, idFileDocument) {
  const jsonBody = {
    sectionId: typeId,
    typeDocumentId: idFileDocument,
    // sectionTypeId: typeId,
    fileUrl: fileUrl.fileUrl,
    status: "EN PROCESO",
    details: "esta todo bien",
  };
  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents";
  const document = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();

  return res;
}

async function updateDocumentFile(fileUrl, token, idFileDocument) {
  const jsonBody = {
    fileUrl: fileUrl.fileUrl,
    status: "EN PROCESO",
    details: "",
  };

  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/${idFileDocument}`;
  const document = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();

  return res;
}

async function postFileOne(token, file, typeId, type, idFileInput) {
  const formData = new FormData();
  formData.append("file", file);

  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/files/pdf";
  const document = await fetch(url, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const res = await document.json();

  if (type == "seguimiento") {
    return res;
  }
  if (type === "update") {
    const updateFile = await updateDocumentFile(res, token, idFileInput);
    return updateFile;
  }
  const resAsync = await postFileAsynId(res, typeId, token, idFileInput);

  return resAsync;
}

async function getFilesUser(id, token) {
  // const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/${id}`;
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/section/${id}`;
  const document = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();
  return res;
}

// antiguo actualizar ya no se usara
async function updateFile(token, file, id, newStatus = false) {
  const type = "seguimiento";

  const newFile = await postFileOne(token, file, id, type);

  const onefile = { fileUrl: newFile.fileUrl };
  const fileStatus = { fileUrl: newFile.fileUrl, status: "EN PROCESO" };
  const jsonBody = newStatus ? fileStatus : onefile;

  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/${id}`;
  const document = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();
  return res;
}

async function updateStatus(token, status, id, details = null) {
  const jsonBody = details ? { details: details } : { status: status };

  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/${id}`;
  const document = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonBody),
  });
  const res = await document.json();
  return res;
}

async function getAllUser(token) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/user`;

  try {
    const document = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    if (!document.ok) {
      throw new Error(`HTTP error! status: ${document.status}`);
    }

    const res = await document.json();
    return res;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Opcional: para manejar el error más arriba en la cadena
  }
}

async function getIdUserDocument(token, id) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/super-user/sections/${id}`;
  const document = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();

  return res;
}

async function getValidCita(token, id) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/process-status/is-eligible-for-appointment/${id}`;
  const document = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();
  return res;
}

async function getTimeCita(token) {
  const url = "https://xynydxu4qi.us-east-2.awsapprunner.com/api/schedule";
  const document = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await document.json();
  return res;
}

async function postCita(token, id, idSection) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/schedule/reserve/${id}/${idSection}`;
  const document = await fetch(url, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await document.json();

  return res;
}

async function verifyCita(token, id) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/appointment/verify/${id}`;
  const verify = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await verify.json();
  return res;
}

async function getSuperUser(token, idSection) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/user-permissions/platform-operators/${idSection} `;
  const verify = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await verify.json();
  return res;
}

async function getSuperTime(token, id, time) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/appointment/week/${id}?date=${time} `;
  const resTime = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resTime.json();
  return res;
}

async function getCreateCita(
  token,
  idSection,
  scheduleId,
  userId,
  dataTime,
  reprograme = true
) {
  const fecha = reprograme
    ? { appointmentDate: dataTime, isFirstTime: true }
    : { appointmentDate: dataTime, isFirstTime: false };
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/appointment/${idSection}/${scheduleId}/${userId} `;
  const resTime = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fecha),
  });

  const res = await resTime.json();
  return res;
}

async function getUserOneCard(token, idSection) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/process-status/next-review/${idSection} `;
  const resUser = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getUserDocumentSection(token, idSection, userId) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/admin/section/documents/${idSection}/${userId} `;
  const resUser = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getAllCitaReserv(token) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/appointment`;
  const resUser = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function sendEmailUser(token, email) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/email/send?email=${email}`;
  const resUser = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getPedingOne(token, idSection) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/process-status/next-corrected/${idSection}`;
  const resUser = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function deleteCita(token, idSection, idUser) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/appointment/section/${idSection}/${idUser}`;
  const resUser = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function deleteHisoryUser(token, idSection, userId) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/admin/finalize/${userId}/${idSection}`;
  const resUser = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function postTokenVerifyEmail(token) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/verify-email?token=${token}`;
  const resUser = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await resUser.json();
  return res;
}

async function RecupePasswordEmail(email) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/reset-password?email=${email}`;
  const resUser = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await resUser.json();
  return res;
}

async function newPassword(token, password) {
  const jsonNewPassword = { password: password };
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/set-password?token=${token}`;
  const resUser = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonNewPassword),
  });

  const res = await resUser.json();
  return res;
}

async function getAllPedingCita(token) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/all-valid/without-appointment`;
  const resUser = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resUser.json();
  return res;
}

async function getProcessFile(token, id) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/process-status/${id}`;
  const resProcess = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function getCompletFilesInputs(token, id) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/documents/section/${id}`;
  const resProcess = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function CreateAsingSection(token, sectionId, idUser) {
  const bodyJson = {
    userId: idUser,
    sectionId: sectionId,
  };
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/user-permissions`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyJson),
  });

  const res = await resProcess.json();
  return res;
}

async function getValueAccess(token, userId) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/user-permissions/${userId}`;
  const resProcess = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function deleteValueAccess(token, id) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/user-permissions/${id}`;
  const resProcess = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function updateMessageCite(token, idCita, message) {
  const bodyJson = {
    message: message,
  };
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/appointment/${idCita}`;
  const resProcess = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyJson),
  });

  const res = await resProcess.json();
  return res;
}

async function sendObserDocument(token, email) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/email/state-change?email=${email}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function sendVeryDocument(token, email) {
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/email/verified-documents?email=${email}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await resProcess.json();
  return res;
}

async function startTramiteDocument(token, idProcess, status = false) {
  let bodyJson;
  if (!status) {
    bodyJson = {
      status: "EN_PROCESO",
    };
  } else if (status) {
    bodyJson = {
      status: "CORREGIDO",
    };
  }

  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/process-status/${idProcess}`;
  const resProcess = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyJson),
  });

  const res = await resProcess.json();
  return res;
}

// todo login para el usuario
const urlPagoOnline = "http://172.16.69.13:8800/api";
async function LoginPagoOnline(data) {
  const url = `${urlPagoOnline}/inicio-sesion?codigo=${data.dni}&password=${data.password}`;
  const resLogin = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await resLogin.json();
  return res;
}

async function LoginFormPost(data) {
  // todo: solo usalo en el trabajo
  // const resPagoOnline = await LoginPagoOnline(data);
  // if (!resPagoOnline.success) {
  //   return {
  //     error: true,
  //     message: resPagoOnline?.message || resPagoOnline?.errors.codigo,
  //   };
  // }
  // const bodyForm = {
  //   documentNumber: resPagoOnline.usuario.numero_documento,
  //   firstName: resPagoOnline.usuario.nombres,
  //   apellido_paterno: resPagoOnline.usuario.apellido_paterno,
  //   apellido_materno: resPagoOnline.usuario.apellido_materno,
  //   email: resPagoOnline.usuario.email,
  // };
  // todo solo usalo fuera del trabajo
  let bodyForm;
  if (data.dni === "60702651") {
    bodyForm = {
      documentNumber: "60702651",
      email: "jacoborosseau@gmail.com",
      firstName: "NEIL",
      apellido_paterno: "TOSCANO",
      apellido_materno: "FERNANDEZ",
    };
  } else if (data.dni === "76735903") {
    bodyForm = {
      documentNumber: "76735903",
      email: "76735963@CERTUS.EDU.PE",
      firstName: "EMMA",
      apellido_paterno: "ABREGU",
      apellido_materno: "LOPEZ",
    };
  }

  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/login`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyForm),
  });

  const res = await resProcess.json();

  return res;
}

async function CreateUserPagoOnline(data) {
  const queryString =
    `numero_documento=${data.dni}&correo=${data.email}&nombres=${data.firstName}` +
    `&apellido_paterno=${data.apellido_paterno}&contrasena=${data.password}` +
    `&tipo_documento_identidad=${2}` +
    `&razon_social=${""}&apellido_materno=${data.apellido_materno}`;

  const url = `${urlPagoOnline}/registrar?${queryString}`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await resProcess.json();
  return res;
}

async function CreateUserLogin(data) {
  const resPagoOnline = await CreateUserPagoOnline(data);
  if (!resPagoOnline.success) {
    if (resPagoOnline?.errors.numero_documento) {
      return {
        error: true,
        message: resPagoOnline.errors.numero_documento,
      };
    } else if (resPagoOnline?.errors.correo) {
      return {
        error: true,
        message: resPagoOnline.errors.correo,
      };
    }
  }
  const bodyForm = {
    documentNumber: resPagoOnline.usuario.numero_documento,
    firstName: resPagoOnline.usuario.nombres,
    apellido_paterno: resPagoOnline.usuario.apellido_paterno,
    apellido_materno: resPagoOnline.usuario.apellido_materno,
    email: resPagoOnline.usuario.email,
    address: data.address,
    mobileNumber: data.mobileNumber,
    district: data.district,
  };

  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/auth/register`;
  const resProcess = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyForm),
  });

  const res = await resProcess.json();
  return res;
}

async function UpdateUserLogin(data) {
  const idUser = { ...data };
  delete data.idUser;
  console.log(data, "viendo datos enviado");
  const url = `https://xynydxu4qi.us-east-2.awsapprunner.com/api/user/${idUser.idUser}`;
  const resProcess = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await resProcess.json();
  console.log(res, "viendo res update");

  return res;
}

//getCompletFilesInputs
const dataApi = {
  updateDocumentFile,
  startTramiteDocument,
  sendVeryDocument,
  sendObserDocument,
  UpdateUserLogin,
  CreateUserLogin,
  LoginFormPost,
  updateMessageCite,
  deleteValueAccess,
  getValueAccess,
  CreateAsingSection,
  getCompletFilesInputs,
  getProcessFile,
  getAllPedingCita,
  newPassword,
  RecupePasswordEmail,
  postTokenVerifyEmail,
  deleteHisoryUser,
  deleteCita,
  getPedingOne,
  sendEmailUser,
  getAllCitaReserv,
  getUserDocumentSection,
  getUserOneCard,
  getCreateCita,
  getSuperTime,
  getSuperUser,
  verifyCita,
  postCita,
  getTimeCita,
  getValidCita,
  updateStatus,
  getIdUserDocument,
  getAllUser,
  getFilesUser,
  sectionDocument,
  postFileOne,
  updateFile,
};

export default dataApi;
