export default {
  /**
   * 上传文件
   */
  upload (args) {
    let formData = new FormData();
    for (const key in args.data) {
      if (args.data.hasOwnProperty(key)) {
        const element = args.data[key];
        formData.append(key, element);
      }
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', args.url);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        args.process(event);
      }
    };
    xhr.onerror = (event) => {
      args.error(event);
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        args.success(JSON.parse(xhr.responseText));
      }
    };

    xhr.setRequestHeader('token', localStorage.getItem('token'));

    xhr.send(formData);
  }
}
