<script>
import ajax from './ajax';
import UploadDragger from './upload-dragger.vue';

export default {
  inject: ['uploader'],
  components: {
    UploadDragger
  },
  props: {
    type: String,
    action: {
      type: String
    },
    name: {
      type: String,
      default: 'file'
    },
    data: Object,
    headers: Object,
    withCredentials: Boolean,
    multiple: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    afterSelect: Function,
    drag: Boolean,
    onPreview: {
      type: Function,
      default: function() {}
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    fileList: Array,
    autoUpload: Boolean,
    listType: String,
    httpRequest: {
      type: Function,
      default: ajax
    },
    disabled: Boolean,
    // FileReader支持的类型
    fileOutputType: {
      type: String,
      default: 'DataUrl'
    }
  },

  data() {
    return {
      mouseover: false,
      reqs: {}
    };
  },

  methods: {
    isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleChange(ev) {
      const files = ev.target.files;

      if (!files) return;
      this.uploadFiles(files);
      this.$refs.input.value = null;
    },
    uploadFiles(files) {
      let postFiles = Array.prototype.slice.call(files);
      if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

      if (postFiles.length === 0) { return; }

      postFiles.forEach(rawFile => {
        // 不上传文件的场合
        if (!this.action) {
          if (!this.afterSelect) {
            this.readFile(rawFile).then((data) => {
              this.onStart(rawFile, data);
            });
          } else {
            const after = this.afterSelect(rawFile);
            if (after && after.then) {
              after.then((f) => {
                this.readFile(f).then((data) => {
                  this.onStart(rawFile, data);
                });
              }).catch((f) => {
                this.readFile(f).then((data) => {
                  this.onStart(rawFile, data);
                });
              });
            } else if (after === true) {
              this.readFile(rawFile).then((data) => {
                this.onStart(rawFile, data);
              });
            }
          }
        } else {
          this.onStart(rawFile);
        }
        if (this.autoUpload) this.upload(rawFile);
      });
    },
    upload(rawFile, file) {
      if (!this.beforeUpload) {
        return this.post(rawFile);
      }

      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            this.post(processedFile);
          } else {
            this.post(rawFile);
          }
        }, () => {
          this.onRemove(rawFile, true);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        this.onRemove(rawFile, true);
      }
    },
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    post(rawFile) {
      const { uid } = rawFile;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.click();
      }
    },
    /**
     * 读取文件并使用指定的格式生成内容
     * @param  {File} file 文件
     * @return {*}    文件内容
     */
    readFile(file) {
      const reader = new FileReader();
      if (this.fileOutputType === 'DataUrl') {
        reader.readAsDataURL(file);
      } else if (this.fileOutputType === 'ArrayBuffer') {
        reader.readAsArrayBuffer(file);
      } else if (this.fileOutputType === 'BinaryString') {
        reader.readAsBinaryString(file);
      } else if (this.fileOutputType === 'Text') {
        reader.readAsText(file);
      }
      return new Promise((resolve, reject) => { // eslint-disable-line
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (err) => {
          reject(err);
        };
      });
    }
  },

  render(h) {
    let {
      handleClick,
      drag,
      name,
      handleChange,
      multiple,
      accept,
      listType,
      uploadFiles,
      disabled
    } = this;
    const data = {
      class: {
        'el-upload': true
      },
      on: {
        click: handleClick
      }
    };
    data.class[`el-upload--${listType}`] = true;
    return (
      <div {...data}>
        {
          drag
          ? <upload-dragger disabled={disabled} on-file={uploadFiles}>{this.$slots.default}</upload-dragger>
          : this.$slots.default
        }
        <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input>
      </div>
    );
  }
};
</script>
