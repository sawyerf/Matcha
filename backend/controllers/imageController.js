import imageModels from "../models/image"

const get = async (req, res) => {
    const image = await imageModels.selectByUid(req.params.uid);

    if (image === false) { 
        res.status(500).json({ 'error': 1, 'message': 'SQL Error' });
    } else if (image === null) {
        res.status(404).json({ 'error': 1, 'message': 'Image not found' });
    } else {
        const img = Buffer.from(image.image, "base64");
        // res.type('image/png');

        // res.status(200).send(image.image);

    
       res.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': img.length
       });
       res.end(img); 
        // res.status(200).send(img);
    }
}

export default {
    get,
}