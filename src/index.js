import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
  <h1>JavaScript HTML5 APIs</h1>
  <div class="uploader">
    <h2>Upload your files ✨</h2>
    <p>Accepts only .png, .jpg, .svg</p>
    <div class="dropzone">📂 Drag to Upload</div>
    <div class="list"></div>
  </div>
  <style>
    .uploader {
      box-sizing: border-box;
      max-width: 90%;
      border-radius: 10px;
      border-bottom: 3px solid #d2d5da;
      margin: 25px auto;
      padding: 25px;
      background: #fff;
    }
    .dragme {
      background: #ce1f99;
      border-radius: 5px;
      width: 50px;
      height: 50px;
    }
    .dropzone {
      border-radius: 5px;
      margin-top: 25px;
      padding: 25px;
      border: 2px dashed #d2d5da;
      background: #f1f2f5;
    }
    .active {
      background: #ebfff6;
      border-color: #24b373;
    }
  </style>
  `;

  const init = () => {
    const dropzone = document.querySelector('.dropzone');
    const list = document.querySelector('.list');

    dropzone.addEventListener('dragenter', (e) =>
      e.target.classList.add('active')
    );
    dropzone.addEventListener('dragleave', (e) =>
      e.target.classList.remove('active')
    );
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
    });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.classList.remove('active');
      const { files } = e.dataTransfer;
      console.log(files);
      handleFileUpload(files);
    });

    // const isAllowedType = (file) => ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type);

    const handleFileUpload = (files) => {
      const filesToUpload = [...files];
      // const filesToUpload = [...files].filter(isAllowedType);
      console.log(filesToUpload);
      filesToUpload.forEach(showFilePreview);
    };

    const showFilePreview = (file) => {
      const reader = new FileReader();
      // console.log(reader)
      // console.log(list,file)
      reader.readAsDataURL(file);
      reader.addEventListener('load', (e) => {
        console.log(e.target.result) // file type & img src ... 
        const div = document.createElement('div');
        div.innerHTML = `
          <div style="display: flex;">
            <img 
              src="${e.target.result}"
              alt="${file.name}"
              style="width: 20px; margin-right: 10px;">
            <p>${file.name} <span>${file.size} bytes</span></p>
          </div>
        `;
        list.append(div);
      });
    };

    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => e.preventDefault());
  };

  if ('draggable' in document.createElement('div')) {
    init();
  }
