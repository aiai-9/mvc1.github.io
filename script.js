
fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        // Add the simple audio samples
        const simpleSamplesContainer = document.getElementById('simple-samples');
        data.groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.classList.add('sample-group');
            
            group.samples.forEach(sample => {
                const sampleElement = document.createElement('div');
                sampleElement.classList.add('sample');
                sampleElement.innerHTML = 
                    <h3>${sample.model}</h3>
                    <audio controls>
                        <source src="${sample.file}" type="audio/wav">
                        Your browser does not support the audio element.
                    </audio>
                ;
                groupElement.appendChild(sampleElement);
            });

            simpleSamplesContainer.appendChild(groupElement);
        });

        // Add the multi-text, multi-model section
        const textSamplesContainer = document.getElementById('text-samples');
        data.texts.forEach(textBlock => {
            const textElement = document.createElement('div');
            textElement.classList.add('text-block');
            textElement.innerHTML = <p><strong>Text:</strong> ${textBlock.text}</p>;

            const modelGroup = document.createElement('div');
            modelGroup.classList.add('model-group');

            textBlock.models.forEach(model => {
                const modelElement = document.createElement('div');
                modelElement.classList.add('model');
                modelElement.innerHTML = 
                    <h3>${model.name}</h3>
                    <audio controls>
                        <source src="${model.file}" type="audio/wav">
                        Your browser does not support the audio element.
                    </audio>
                ;
                modelGroup.appendChild(modelElement);
            });

            textElement.appendChild(modelGroup);
            textSamplesContainer.appendChild(textElement);
        });
    })
    .catch(error => console.error('Error loading samples:', error));
