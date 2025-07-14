# Background Image Handling

The Wall Clock Card uses lazy loading for background images to improve performance and reduce memory usage:

1. **Lazy Loading**: Images are only loaded when they are needed for display, not all at once
2. **Preloading**: The next image in the rotation is preloaded shortly before it's needed to ensure smooth transitions
3. **Error Handling**: If an image fails to load, the component will automatically try the next image
4. **Memory Efficient**: Only the URLs of all images are stored initially, with actual image data loaded on demand

When `imageSource` is set to an online source like 'picsum', the component will fetch the specified number of image URLs from the selected source when it loads. If you also have local images configured in `backgroundImages`, both sets of images will be used in the rotation. If you don't want any background images, you can set `imageSource: 'none'`.