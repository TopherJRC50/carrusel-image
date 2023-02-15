/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaPlaceholder, BlockIcon, BlockControls, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
import { ToolbarButton, ToolbarGroup, SelectControl, ToggleControl, PanelBody  } from "@wordpress/components";

export default function Edit(props) {
	

const hasImages = props.attributes.images.length > 0;

	return (
		<>
			{<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							multiple
							gallery
							addToGallery={true}
							onSelect={(newImages) =>
								props.setAttributes({ images: newImages })}
							allowedTypes={["image"]}
							value={props.attributes.images.map((image) => image.id)}
							render={({ open }) => (
								<ToolbarButton onClick={open}>
									{__("Edit Gallery", "scrollable-gallery")}
								</ToolbarButton>)}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>}
			{<InspectorControls>
				<PanelBody title={__("General", "scrollable-gallery")} initialOpen>
					<ToggleControl
						checked={props.attributes.pauseOnHover}
						label={__("Pause on hover", "scrollable-gallery")}
						onChange={() =>
							props.setAttributes({
								pauseOnHover: !props.attributes.pauseOnHover,
							})
						}
					/>
				</PanelBody>
				<SelectControl
				value={props.attributes.direction}
				options={[
					{ value: "right", label: "Right" },
					{ value: "left", label: "Left" },
				]}
				label={__("Direction", "scrollable-gallery")}
				onChange={(newDirection) => props.setAttributes({ direction: newDirection })}
			/>
			</InspectorControls>}
			<div {...useBlockProps()}>
				{hasImages && (
					<figure className="scrollable-gallery-inner-container">
						{props.attributes.images.map((image, index) => (
							<img key={index} src={image.url} />
						))}
					</figure>
				)}
				{!hasImages && (
					<MediaPlaceholder
						multiple
						gallery
						icon={<BlockIcon icon="format-gallery" />}
						labels={{
							title: "Scrollable Gallery",
							instructions: "Create a sponsors scrollable gallery.",
						}}
						onSelect={(newImages) => props.setAttributes({ images: newImages })}
					/>
				)}
			</div>
		</>
	);
}
