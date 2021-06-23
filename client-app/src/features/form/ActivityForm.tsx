import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Grid, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { values } from "mobx";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MySelectInput from "../../app/common/form/MySelectInput";
import { categoryOptions } from "../../app/common/options/categoryOptions";
import MyDateInput from "../../app/common/form/MyDateInput";

interface DetailsParamas {
  id: string;
}

export default observer(function ActivityForm({ match, history }: RouteComponentProps<DetailsParamas>) {
  const activityStore = useStore().activityStore;
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActvity
  } = activityStore;


  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity is required"),
    description: Yup.string().required("The description is required"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required()    
  })

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState))
    }

    return () => {
      clearActvity();
    };
  }, [loadActivity, match.params.id, clearActvity, initialFormState, activity.id.length]);

  // const handleSubmit = () => {
  //   // setSubmmit(false);
  //   console.log(activity.id);

  //   if (activity.id.length === 0) {
  //     let newActivty = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivty).then(() => history.push(`/activities/${newActivty.id}`));
  //   } else {
  //     editActivity(activity).then(() => history.push(`/activities/${activity.id}`));;
  //   }
  //   // setSubmmit(true);
  // };

  // const handleChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setActivity({ ...activity, [name]: value });
  // };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={activity}
          onSubmit={values => console.log(values)}>
          {({ values: activity, handleChange, handleSubmit }) => (
            <Segment clearing>
              <Form className='ui form' onSubmit={handleSubmit}>
                <MyTextInput name='title' placeholder='Title' />
                <MyTextInput
                  name="title"
                  placeholder="Title"
                />
                <MyTextArea
                  name="description"
                  rows={3}
                  placeholder="Description"
                />
                <MySelectInput
                  options={categoryOptions}
                  name="category"
                  placeholder="Category"
                />
                <MyDateInput
                  name="date"                  
                  placeholderText="Date"
                  showTimeSelect
                  timeCaption='time'
                  dateFormat='MMMM d, yyyy h:mm aa'
                />
                <MyTextInput
                  name="city"
                  placeholder="City"
                />
                <MyTextInput
                  name="venue"
                  placeholder="Venue"
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push('/activities')}
                  floated="right"
                  type="button"
                  content="Cancel"
                ></Button>
              </Form>
            </Segment>
          )}
        </Formik>

      </Grid.Column>
    </Grid>

  );
});


