import React, { useCallback, useState, useRef, useCallback } from "react";
import { useFormikContext } from "formik";

import FileInput from "./formik-file-input/component";

export const FileInputContainer = ({
	component: Component,
	className,
	validFormats,
	name,
	hideName,
	hideError,
	hideDelete,
}) => {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		setFieldError,
	} = useFormikContext();

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

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		setFieldTouched(name, true);
		if (isFileValid(file)) {
			setFieldValue(name, file);
			setFieldError(name, null);
		}
	};

	const handleFileDelete = useCallback(() => {
		setFieldValue(name, null);
		setFieldError(name, null);
	}, []);

	const fileInputProps = {
		InputComponent: Component,
		className,
		handleChange: handleFileUpload,
		fileName: values[name] && values[name].name,
	};

	return (
		<div>
			<FileInput {...fileInputProps} />
			{!hideName && <p>{values[name] && values[name].name}</p>}
			{!hideError && touched[name] && <p>{errors[name]}</p>}
			{!hideDelete && (
				<button type="button" onClick={handleFileDelete}>
					Delete
				</button>
			)}
		</div>
	);
};

import ImageInput from "./formik-image-input/component";

const universalImageFormats = [
	"image/png",
	"image/svg+xml",
	"image/jpeg",
	"image/gif",
	"image/bmp",
	"image/tiff",
	"image/webp",
];

export const ImageInputContainer = ({
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
