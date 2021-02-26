import React, { useCallback, useRef, useState } from "react";
import { useFormikContext } from "formik";

import ImageInput from "./component";

const universalImageFormats = [
	"image/png",
	"image/svg+xml",
	"image/jpeg",
	"image/gif",
	"image/bmp",
	"image/tiff",
	"image/webp",
];

const ImageInputContainer = ({
	component: Component,
	className,
	validFormats = universalImageFormats,
	name,
	hideName,
	hideError,
	hideDelete,
	hideEdit,
}) => {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		setFieldError,
	} = useFormikContext();
	const [imageUrl, setImageUrl] = useState(null);
	const inputRef = useRef(null);

	const isFileValid = useCallback(
		(file) => {
			if (!validFormats.includes(file.type)) {
				setFieldValue(name, null);
				setTimeout(() => {
					setFieldError(
						name,
						`Invalid file format. Accepted formats are ${validFormats.join(
							", "
						)}`
					);
				}, 0);
				return false;
			}
			return true;
		},
		[validFormats]
	);

	const generateImageUrl = (image) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			setImageUrl(e.target.result);
		};
		reader.readAsDataURL(image);
	};

	const handleImageUpload = (e) => {
		const image = e.target.files[0];
		setFieldTouched(name, true);
		if (isFileValid(image)) {
			setFieldValue(name, image);
			setFieldError(name, null);
			generateImageUrl(image);
		}
	};

	const handleImageDelete = useCallback(() => {
		setFieldValue(name, null);
		setFieldError(name, null);
		setImageUrl(null);
	}, []);

	const showInputWindow = useCallback(
		(e) => {
			inputRef.current.click();
			e.stopPropagation();
		},
		[inputRef]
	);

	const imageInputProps = {
		InputComponent: Component,
		className,
		handleChange: handleImageUpload,
		fileName: values[name] && values[name].name,
		showInputWindow,
		inputRef,
		imageUrl,
		handleImageDelete,
	};

	return (
		<div>
			<ImageInput {...imageInputProps} />
			{!hideName && <p>{values[name] && values[name].name}</p>}
			{!hideError && touched[name] && <p>{errors[name]}</p>}
			{!hideEdit && (
				<button type="button" onClick={handleImageEdit}>
					Edit
				</button>
			)}
			{!hideDelete && (
				<button type="button" onClick={handleImageDelete}>
					Delete
				</button>
			)}
		</div>
	);
};

export default ImageInputContainer;
