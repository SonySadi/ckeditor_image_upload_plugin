CKEDITOR.dialog.add("imageuploadDialog", function(editor) {
  return {
    title: "File Upload",
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: "upload_image_dialog",
        label: "Image",
        elements: [
          {
            type: "html",
            html: '<input type="file" id="imagefileuploadinput" />'
          },
          {
            type: "text",
            id: "image_alt_text",
            label: "Alternative text"
          },
          {
            type: "text",
            id: "image_width",
            label: "Width"
          },
          {
            type: "text",
            id: "image_height",
            label: "Height"
          }
        ]
      }
    ],
    onOk: function() {
			let tabid = CKEDITOR.dialog.getCurrent().definition.dialog._.currentTabId;
			console.log(tabid);
			dialogbox = this;
			dialogElement = dialogbox.getElement();

			let formData = new FormData();
			formData.append("_csrf", document.getElementById("csrftocken").value);
			formData.append(
			  "fileToUpload",
			  document.getElementById("imagefileuploadinput").files[0]
			);
			let alt = dialogbox.getValueOf("upload_image_dialog", "image_alt_text");
			let width = dialogbox.getValueOf("upload_image_dialog", "image_width");
			let height = dialogbox.getValueOf(
			  "upload_image_dialog",
			  "image_height"
			);
			$.ajax({
			  type: "POST",
			  url: "/social-post/image_upload",
			  data: formData,
			  processData: false,
			  contentType: false,
			  success: r => {
			    if (r.state) {
			      var abbr = editor.document.createElement("img");
			      abbr.setAttribute("src", r.src);
			      alt.length > 0 ? abbr.setAttribute("alt", alt) : "";
			      width.length > 0 ? abbr.setAttribute("width", width + "") : "";
			      height.length > 0 ? abbr.setAttribute("height", height + "") : "";
			      editor.insertElement(abbr);
			    } else {
			      console.log(r.msg);
			    }
			  }
			});
      
    }
  };
});
