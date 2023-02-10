import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, FormFileUpload, PanelBody, Button, ResponsiveWrapper } from '@wordpress/components';


const { Fragment } = wp.element;
const { withSelect } = wp.data;

import {
	InspectorControls, 
    useBlockProps,
    ColorPalette,
	MediaUpload, 
	MediaUploadCheck
} from '@wordpress/block-editor';
export default function save(props ) {
	const { attributes } = props;
		const blockStyle = {
			backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
		};
		return (
			<div style={blockStyle}>
				... Your block content here...
			</div>
		);
}
