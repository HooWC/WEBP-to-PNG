document.getElementById('fileInput').addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const outputDiv = document.getElementById('output');
                outputDiv.innerHTML = '<h2>Selected Image</h2>';
                outputDiv.appendChild(img);
            };
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please choose a WebP image.");
        return;
    }

    const reader = new FileReader();

    reader.onload = async function (e) {
        const arrayBuffer = e.target.result;
        const webpMachine = new webpHero.WebpMachine();
        const canvas = await webpMachine.decode(arrayBuffer);

        // Convert Canvas to PNG
        const pngDataUrl = canvas.toDataURL('image/png');

        // Display PNG image
        const convertedDiv = document.getElementById('converted');
        const img = new Image();
        img.src = pngDataUrl;
        convertedDiv.innerHTML = '<h2>Converted PNG Image</h2>';
        convertedDiv.appendChild(img);
    };

    reader.readAsArrayBuffer(file);
});
