/**
 * @author yeefan
 * @datetime 2014-12-02
 * @address sl.CBD
 * @Remark HTML5 JS�� �����漰HTML5��ǩ�����ԣ�ʹ����ע��Ӧ�û�����IE��Chrome�ȣ�
*/


/**
* ��ͼƬ������canvas�У�����canvas����
* @param image����ͼƬ����
* @return canvas����
*/
function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);
	return canvas;
}

/**
* ����������ΪͼƬ��ʽ������image����
* @param canva����
* @param mineͼƬ���ͣ���image/png������image/jpeg������image/bmp����
* @return image����
*/
function convertCanvasToImage(canvas,mine) {
	var image = new Image();
	image.src = canvas.toDataURL(mine);
	return image;
}

/**
* ����������Ϊ��ͬͼƬ��ʽ�������� MIME type image/octet-stream����
* �磺data:image/octet-stream;base64,iVBORw0KGgoAAAANSUhEU....
* @param pCanvas canvas��������
* @param strType ͼƬ��ʽ���ͣ�PNG��BMP��JPEG��
* @return image/octet-stream����
* ˵����Canvas2Image.saveAsJPEG(canvas����true);����true������image����ͬconvertCanvasToImage����
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



















