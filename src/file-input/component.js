import React, { useCallback, useRef } from "react";

const DefaultComponent = ({ ref, hidden, handleChange }) => (
	<input
		type="file"
		ref={ref}
		onChange={handleChange}
		style={hidden ? {} : { display: "none" }}
	/>
);

const FileInput = ({ InputComponent, className, handleChange }) => {
	const inputRef = useRef(null);

	const Component = React.memo(() =>
		InputComponent ? (
			<>
				<DefaultComponent hidden ref={inputRef} onChange={handleChange} />
				<InputComponent />
			</>
		) : (
			<DefaultComponent ref={inputRef} onChange={handleChange} />
		)
	);

	const showInputWindow = useCallback(() => {
		inputRef.current.click();
	}, [inputRef]);

	return (
		<div onClick={showInputWindow} className={className}>
			<Component />
		</div>
	);
};

export default FileInput;
