import { AxiosError } from "axios";
import { Id, toast, TypeOptions } from "react-toastify";

export function getCookie(name: string, cookie = "") {
  let matches = cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}

export function setCookie(name: string, value: string, options: any = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export const filter = (params: any) => {
  const obj = { ...params };

  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object) {
      const values = Object.values(obj[key]).filter(
        (x: any) => ![null, undefined].includes(x)
      );

      if (!values.length) delete obj[key];
    }
  });

  return obj;
};

export const month = (count: number, locale: string | undefined) => {
  if (locale === "uz") return `${count} oy`;
  if (count === 1) return "месяц";
  if (count > 1 && count < 5) return `${count} месяцa`;
  if (count > 5) return `${count} месяцев`;
  return count;
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function meiliRange(item: any, query: string) {
  if (item?.name) {
    item.meili = `<div>${item.name.replace(query, `<mark>${query}</mark>`)}${
      item?.meta ? `<p class="text-gray-500 text-sm">${item?.meta}</p>` : ""
    }<div>`;
  }

  if (item?.displayName) {
    item.meili = `<div>${item.displayName.replace(
      query,
      `<mark>${query}</mark>`
    )}${
      item?.meta ? `<p class="text-gray-500 text-sm">${item?.meta}</p>` : ""
    }<div>`;
  }

  if (item?.title) {
    item.meili = `<div>${item.title.replace(query, `<mark>${query}</mark>`)}${
      item?.meta ? `<p class="text-gray-500 text-sm">${item?.meta}</p>` : ""
    }<div>`;
  }

  return item;
}

export const formatData = (formdata: any) => {
  const postData = new FormData();
  const formatData: any = {
    ...formdata,
  };

  Object.keys(formatData).forEach((key) => {
    if (![undefined, null, "undefined"].includes(formatData[key])) {
      if (Array.isArray(formatData[key])) {
        formatData[key].forEach((data: any, i: number) => {
          postData.append(key, data);
        });

        return;
      }

      if (formatData[key] instanceof Object) {
        if (Object.keys(formatData[key]).length) {
          Object.keys(formatData[key]).forEach((key2) => {
            postData.append(`${key}[${key2}]`, formatData[key][key2]);
          });

          return;
        } else {
          postData.append(key, formatData[key]);
        }
      } else {
        postData.append(key, formatData[key]);
      }
    }
  });

  return postData;
};

export const sort = (
  a: any,
  b: any,
  sortBy: string,
  orderBy: "asc" | "desc" = "asc"
) => {
  if (orderBy === "asc") {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
  } else {
    if (a[sortBy] < b[sortBy]) {
      return 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return -1;
    }
  }
  // a должно быть равным b
  return 0;
};

export const sortByDate = (a: any, b: any, orderBy: "asc" | "desc" = "asc") => {
  const adead = new Date(a.deadline).getTime();
  const bdead = new Date(b.deadline).getTime();

  if (orderBy === "asc") {
    if (adead > bdead) {
      return 1;
    }
    if (adead < bdead) {
      return -1;
    }
  } else {
    if (adead < bdead) {
      return 1;
    }
    if (adead > bdead) {
      return -1;
    }
  }

  // a должно быть равным b
  return 0;
};

export const formatNumber = (number = 0, fixed = 0) => {
  return new Intl.NumberFormat("ru-RU", {})
    .format(Number(typeof number === "number" ? number?.toFixed(fixed) : 0))
    .replace(",", ".");
};

export const imageUpload =
  (setPreview: (preview: any) => void, setFile: (file: File) => void) =>
  (e: any) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

class ToastClass {
  info(info: string) {
    toast.info(info);
  }

  success(message: string) {
    toast.success(message);
  }

  error(error: AxiosError<any>) {
    let message =
      error.response?.data.message || error.message || "Server Side Error";

    if (error.response?.data instanceof Blob) {
      const fr = new FileReader();

      fr.onload = function () {
        if (typeof this.result === "string") {
          const e = JSON.parse(this.result);
          message = e.message;
        }

        toast.error(message);
      };

      return fr.readAsText(error.response?.data);
    }

    if (Array.isArray(message)) {
      message = message.join(", ");
    }

    toast.error(message);
  }

  warning(warning: string) {
    toast.warn(warning);
  }

  promise(
    func: Promise<any>,
    { pending, success }: { pending: string; success: string }
  ) {
    return toast.promise(func, {
      pending,
      success,
      error: {
        render({ data }: any) {
          console.log("error, ", data);

          let message =
            data.response?.data.message || data.message || "Server Side Error";

          if (data.response?.data instanceof Blob) {
            const fr = new FileReader();

            fr.onload = function () {
              if (typeof this.result === "string") {
                const e = JSON.parse(this.result);
                message = e.message;
              }

              toast.error(message);
            };

            return fr.readAsText(data.response?.data);
          }

          if (Array.isArray(message)) {
            message = message.join(", ");
          }
          // When the promise reject, data will contains the error
          return message;
        },
      },
    });
  }

  loading(message: string): Id {
    return toast.loading(message);
  }

  update(
    id: Id,
    data: {
      render: string;
      type: TypeOptions;
      isLoading?: boolean;
    }
  ) {
    toast.update(id, data);
  }
}

export const Toast = Object.freeze(new ToastClass());
