name: Feature request
description: Propose an idea for a feature or an enhancement
labels: ['Type: enhancement']

body:
    - type: markdown
      attributes:
          value: |
              Thank you for taking the time to suggest a new feature for the Exoole plugin!

    - type: textarea
      attributes:
          label: What problem does this address?
          description: Please describe if this feature or enhancement is related to a current problem or pain point.
          placeholder: |
              I'm always frustrated when ... or It is currently difficult to ...
      validations:
          required: true

    - type: textarea
      attributes:
          label: What is your proposed solution?
          description: Please outline the feature or enhancement that you want and how it addresses any problem identified above.
          placeholder: |
              I would like to see ...
      validations:
          required: true

    - type: textarea
      attributes:
          label: Additional context
          description: Add any other context, screenshots, or examples about the feature request.
      validations:
          required: false

    - type: checkboxes
      id: existing
      attributes:
          label: Please confirm you have searched existing issues in the repository.
          description: You can search at https://github.com/theaminuli/exoole/issues to ensure this feature hasn't already been requested.
          options:
              - label: 'Yes'
                required: true