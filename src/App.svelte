<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let description = "";
  let email = "";
  let imageUrl = "";

  let meetups = [
    {
      id: "m1",
      title: "My cool meetup 1",
      subtitle: "A really cool subtitle for meetup 1",
      description: "We're gonna have a really good time at meetup 1!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Wandsworth_Bridge_Road_Caff%C3%A8_Nero.jpg/1024px-Wandsworth_Bridge_Road_Caff%C3%A8_Nero.jpg",
      address: "123 Main St., New York, NY 34567",
      contactEmail: "meetup1@meetus.com"
    },
    {
      id: "m2",
      title: "My cool meetup 2",
      subtitle: "A really cool subtitle for meetup 2",
      description: "We're gonna have a really good time at meetup 2!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Starbuckscenter.jpg/1024px-Starbuckscenter.jpg",
      address: "456 Main St., New York, NY 34567",
      contactEmail: "meetup2@meetus.com"
    }
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };
    meetups = [newMeetup, ...meetups];
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      controlType="text"
      id="title"
      label="Title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      controlType="text"
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      controlType="text"
      id="address"
      label="Address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      controlType="text"
      id="imageurl"
      label="Image URL"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      controlType="text"
      id="email"
      label="E-Mail"
      value={email}
      type="email"
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      rows="3"
      value={description}
      on:input={event => (description = event.target.value)} />
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>
