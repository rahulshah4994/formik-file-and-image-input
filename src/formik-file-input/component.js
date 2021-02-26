import React, { useCallback, useRef } from "react";

const DefaultComponent = ({ passRef, hidden, onChange }) => (
	<input
		type="file"
		ref={passRef}
		onChange={onChange}
		style={hidden ? { display: "none" } : {}}
	/>
);

const FileInput = ({ InputComponent, className, handleChange, fileName }) => {
	const inputRef = useRef(null);

	const Component = React.memo(() => {
		if (InputComponent) {
			return (
				<div>
					<DefaultComponent hidden passRef={inputRef} onChange={handleChange} />
					<InputComponent fileName={fileName} />
				</div>
			);
		}
		return <DefaultComponent passRef={inputRef} onChange={handleChange} />;
	});

	const showInputWindow = useCallback(() => {
		if (InputComponent) {
			inputRef.current.click();
		}
	}, [inputRef]);

	return (
		<div onClick={showInputWindow} className={className}>
			<Component />
		</div>
	);
};

export default FileInput;
