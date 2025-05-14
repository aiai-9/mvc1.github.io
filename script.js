fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const samplesContainer = document.getElementById('samples');
        data.groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.classList.add('sample-group');
            
            group.samples.forEach(sample => {
                const sampleElement = document.createElement('div');
                sampleElement.classList.add('sample');
                sampleElement.innerHTML = `
                    <h3>${sample.model}</h3>
                    <audio controls>
                        <source src="${sample.file}" type="audio/wav">
                        Your browser does not support the audio element.
                    </audio>
                `;
                groupElement.appendChild(sampleElement);
            });

            samplesContainer.appendChild(groupElement);
        });
    })
    .catch(error => console.error('Error loading samples:', error));
