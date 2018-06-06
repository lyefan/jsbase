/**
 * @author yeefan
 * @datetime 2014-12-02
 * @address sl.CBD
 * @Remark HTML5 JS库 部分涉及HTML5标签及属性，使用请注意应用环境（IE、Chrome等）
*/


/**
* 将图片拷贝到canvas中，返回canvas对象
* @param image对象，图片对象
* @return canvas对象
*/
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);
	return canvas;
}

/**
* 将画布保存为图片格式，返回image对象
* @param canva对象
* @param mine图片类型（“image/png”、“image/jpeg”、“image/bmp”）
* @return image对象
*/
function convertCanvasToImage(canvas,mine) {
	var image = new Image();
	image.src = canvas.toDataURL(mine);
	return image;
}

/**
* 将画布保存为不同图片格式流，返回 MIME type image/octet-stream对象
* 如：data:image/octet-stream;base64,iVBORw0KGgoAAAANSUhEU....
* @param pCanvas canvas画布对象
* @param strType 图片格式类型（PNG、BMP、JPEG）
* @return image/octet-stream对象
* 说明：Canvas2Image.saveAsJPEG(canvas对象，true);参数true将返回image对象，同convertCanvasToImage方法
*/
function saveCanvas(pCanvas, strType) {
	var bRes = false;
	if (strType == "PNG")
		bRes = Canvas2Image.saveAsPNG(oCanvas);
	if (strType == "BMP")
		bRes = Canvas2Image.saveAsBMP(oCanvas);
	if (strType == "JPEG")
		bRes = Canvas2Image.saveAsJPEG(oCanvas);

	if (!bRes) {
		alert("Sorry, this browser is not capable of saving " + strType + " files!");
		return false;
	}
	
	return bRes;
}



















