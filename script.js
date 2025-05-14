fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const samplesContainer = document.getElementById('samples');
        data.samples.forEach(sample => {
            const sampleElement = document.createElement('div');
            sampleElement.classList.add('sample');
            sampleElement.innerHTML = `
                <div class="text">${sample.text}</div>
                <div class="audio-container">
                    <audio controls>
                        <source src="assets/${sample.file}" type="audio/wav">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
            samplesContainer.appendChild(sampleElement);
        });
    })
    .catch(error => console.error('Error loading samples:', error));
