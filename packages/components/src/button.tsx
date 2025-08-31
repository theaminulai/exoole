/**
 * Exoole Button Component
 * 
 * A reusable button component following WordPress/Gutenberg design patterns.
 * 
 * @package @exoole/components
 */

import { createElement } from '@wordpress/element';
import classnames from 'classnames';

export interface ButtonProps {
	/** Button text content */
	children: React.ReactNode;
	/** Button variant style */
	variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
	/** Button size */
	size?: 'small' | 'normal' | 'large';
	/** Whether the button is disabled */
	disabled?: boolean;
	/** Click handler */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	/** Additional CSS classes */
	className?: string;
	/** Button type */
	type?: 'button' | 'submit' | 'reset';
}

/**
 * Button component for Exoole interface
 */
const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'secondary',
	size = 'normal',
	disabled = false,
	onClick,
	className,
	type = 'button',
	...props
}) => {
	const classes = classnames(
		'exoole-button',
		`exoole-button--${variant}`,
		`exoole-button--${size}`,
		{
			'exoole-button--disabled': disabled,
		},
		className
	);

	return createElement(
		'button',
		{
			type,
			className: classes,
			disabled,
			onClick,
			...props,
		},
		children
	);
};

export default Button;
