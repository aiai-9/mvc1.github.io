fetch('data/samples.json')
    .then(response => response.json())
    .then(data => {
        const textSamplesContainer = document.getElementById('text-samples');
        
        data.texts.forEach(section => {
            // Add section title
            const sectionTitle = document.createElement('h2');
            sectionTitle.classList.add('section-title');
            sectionTitle.textContent = section.title;
            textSamplesContainer.appendChild(sectionTitle);

            // Add section description if available
            if (section.description) {
                const sectionDesc = document.createElement('p');
                sectionDesc.classList.add('section-description');
                sectionDesc.innerHTML = section.description;
                textSamplesContainer.appendChild(sectionDesc);
            }

            // Add text samples
            section.samples.forEach(sample => {
                const textElement = document.createElement('div');
                textElement.classList.add('text-block');
                textElement.innerHTML = `<p><strong>Text:</strong> ${sample.text}</p>`;

                const modelGroup = document.createElement('div');
                modelGroup.classList.add('model-group');

                sample.models.forEach(model => {
                    const modelElement = document.createElement('div');
                    modelElement.classList.add('model');
                    modelElement.innerHTML = `
                        <h3>${model.name}</h3>
                        <audio controls>
                            <source src="${model.file}" type="audio/wav">
                            Your browser does not support the audio element.
                        </audio>
                    `;
                    modelGroup.appendChild(modelElement);
                });

                textElement.appendChild(modelGroup);
                textSamplesContainer.appendChild(textElement);
            });
        });
    })
    .catch(error => console.error('Error loading samples:', error));
