# Submitting to HACS

This document provides instructions on how to submit the Wall Clock Card to HACS (Home Assistant Community Store).

## Prerequisites

Before submitting to HACS, ensure that:

1. Your repository is public on GitHub
2. You have created at least one release on GitHub
3. Your repository has the necessary files for HACS:
   - hacs.json
   - README.md
   - The main JavaScript file (wall-clock-card.js) in the dist directory

## Submission Process

1. Go to the [HACS Default](https://github.com/hacs/default) repository
2. Fork the repository
3. Add your repository to the appropriate category:
   - For this Lovelace card, add it to the `plugin` category in the `plugin` file
4. Create a pull request to the HACS Default repository
5. Wait for the HACS team to review your submission

## Validation

The HACS team will validate your submission using their automated tools. Make sure your repository passes all the validation checks:

1. The repository must be public
2. The repository must have at least one release
3. The repository must have the necessary files for HACS
4. The repository must have a valid hacs.json file
5. The repository must have a valid README.md file
6. The repository must have a valid license

## After Submission

Once your submission is approved, your component will be available in the HACS store for all Home Assistant users to install.

## Updating Your Component

When you update your component:

1. Make your changes
2. Update the CHANGELOG.md file
3. Create a new release on GitHub
4. HACS will automatically detect the new release and make it available to users

## Resources

- [HACS Documentation](https://hacs.xyz/docs/publish/start)
- [HACS Default Repository](https://github.com/hacs/default)
- [HACS Discord](https://discord.gg/apgchf8)