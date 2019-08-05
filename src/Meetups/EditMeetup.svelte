<script>
  import meetups from "./meetups-store.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isEmail } from "../helpers/validation.js";

  export let id = null;

  let title = "";
  let subtitle = "";
  let address = "";
  let description = "";
  let contactEmail = "";
  let imageUrl = "";
  let formValid = false;

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      description = selectedMeetup.description;
      contactEmail = selectedMeetup.contactEmail;
      imageUrl = selectedMeetup.imageUrl;
    });
    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isEmail(contactEmail);
  $: formValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: contactEmail,
      address: address
    };

    if (id) {
      meetups.updateMeetup(id, meetupData);
      id = null;
    } else {
      meetups.addMeetup(meetupData);
    }

    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Add Meetup" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      controlType="text"
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      controlType="text"
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      controlType="text"
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      controlType="text"
      id="imageurl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL."
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      controlType="text"
      id="contactEmail"
      label="E-Mail"
      valid={emailValid}
      validityMessage="Please enter a valid contactEmail address."
      value={contactEmail}
      type="contactEmail"
      on:input={event => (contactEmail = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      rows="3"
      value={description}
      on:input={event => (description = event.target.value)} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" disabled={!formValid} on:click={submitForm}>
      Save
    </Button>
  </div>
</Modal>
