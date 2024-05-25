import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { Formik, Form } from 'formik'
import { InputFileUpload, InputSelect, InputText, InputTextArea } from '../../../../helpers/FormInputs'
import SpinnerButton from '../../../../partials/spinners/SpinnerButton'
import { setError, setIsAdd, setMessage, setSuccess } from '../../../../../store/StoreAction'
import { StoreContext } from '../../../../../store/StoreContext'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryData } from '../../../../helpers/queryData'
import ModalWrapper from '../../../../partials/ModalWrapper'
import useUploadPhoto from '../../../../custom-hook/useUploadPhoto'
import { devBaseImgUrl } from '../../../../helpers/functions-general'
import useQueryData from '../../../../custom-hook/useQueryData'

const ModalAddmenu = ({itemEdit, position}) => {
    const {store, dispatch} = React.useContext(StoreContext)
    const handleClose = () => dispatch(setIsAdd(false));

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (values) =>
        queryData(
            itemEdit ? `/v1/menu/${itemEdit.menu_aid}` :`/v1/menu`,
            itemEdit ? "put" : "post",
            values
        ),
   
        onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["menu"] });
        if (data.success) {
            dispatch(setIsAdd(false));
            dispatch(setSuccess(true));
            dispatch(setMessage(`Successfuly updated.`));
        } else {
            dispatch(setError(true));
            dispatch(setMessage(data.error));
        } 
        },
    });

    const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
        `/v1/upload/photo`,
        dispatch
      );

      const {
        isLoading,
        isFetching,
        error,
        data: category,
      } = useQueryData(
        `/v1/category`, // endpoint
        "get", // method
        "category" // key
      );

    
     const initVal  = {

          menu_name : itemEdit ? itemEdit.menu_name : "",
          menu_image : itemEdit ? itemEdit.menu_image : "",
          menu_category_id : itemEdit ? itemEdit.menu_category_id : "",
          menu_price : itemEdit ? itemEdit.menu_price : "",
     }
       

     const yupSchema = Yup.object({
       
        menu_name: Yup.string().required("Required"),
        menu_category_id: Yup.string().required("Required"),
        menu_price: Yup.string().required("Required"),
     })


     


  return (
    <div>
      <ModalWrapper position={position}>
      <div className="main-modal w-[900px] bg-secondary text-content">
                <div className="modal-header p-4 relative">
                    <h2>New Menu</h2>
                    <button className='absolute top-[25px] right-4' onClick={handleClose}><LiaTimesSolid/></button>
                </div>
                <div className="modal-body p-4">
                    <Formik
                        initialValues={initVal}
                        validationSchema={yupSchema}
                        onSubmit={async (values) => {
                            uploadPhoto()
                            mutation.mutate({...values, 
                                menu_image:
                                (itemEdit && itemEdit.menu_image === "") || photo
                                  ? photo === null
                                    ? itemEdit.menu_image
                                    : photo.name
                                  : values.menu_image,})
                          }}
                    >
                        {(props) => {
                            return (
                            <Form  className='flex flex-col'>
                                 {/* h-[calc(100vh-110px)] */}
                        <div className='grow overflow-y-auto'>
                     
                        <div className="input-wrap">
                            <InputText
                                label="Menu Name"
                                type="text"
                                name="menu_name"
                            />
                        </div>
                    <div className="grid grid-cols-[1fr_2fr] gap-10">
                        <div className="left">
                        <div className="input-wrap">
                {photo || (itemEdit && itemEdit.menu_image !== "") ? (
               <img
               src={
               photo
               ? URL.createObjectURL(photo) // preview
               : itemEdit.menu_image // check db
               ? devBaseImgUrl + "/" + itemEdit.menu_image
               : null
               }
               alt="Photo"
               className="rounded-tr-md rounded-tl-md h-[200px] max-h-[200px] w-full object-cover object-center m-auto"
               />
                 ) : (
              <span className=" h-[200px] w-full  flex items-center justify-center">
              <span className="text-accent mr-1">Drag & Drop</span>{" "}
               photo here or{" "}
               <span className="text-accent ml-1">Browse</span>
             </span>
               )}

               {(photo !== null ||
               (itemEdit && itemEdit.menu_image !== "")) && (
               <span className="min-h-10 flex items-center justify-center">
                <span className="text-accent mr-1">Drag & Drop</span>{" "}
                photo here or{" "}
                <span className="text-accent ml-1">Browse</span>
                </span>
)}

{/* <FaUpload className="opacity-100 duration-200 group-hover:opacity-100 fill-dark/70 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" /> */}
               <InputFileUpload
               label="Photo"
               name="photo"
               type="file"
               id="myFile"
               accept="image/*"
               title="Upload photo"
               onChange={(e) => handleChangePhoto(e)}
               onDrop={(e) => handleChangePhoto(e)}
               className="opacity-0 absolute right-0 bottom-0 left-0 m-auto cursor-pointer h-full"
/>

                </div>
                        

                <div className="input-wrap">
                                        <InputSelect
                                            label="Category"
                                            type="text"
                                            name="menu_category_id">
                                                {category?.data.map((item, key)=> (
                                                     item.category_is_active === 1 && (
                                                    <React.Fragment key={key}>
                                                        <option hidden>Select</option>
                                                        <option value={item.category_aid} >{item.category_title}</option>
                                                    </React.Fragment >
                                                     ))
                                            )} 
                                        </InputSelect>
                                        </div>
                        </div>
                         <div className="right">
                         <div className="input-wrap">
                        <InputText
                                label="Price"
                                type="number"
                                name="menu_price"
                            />
                        </div>
                         </div>
                    </div>
                        </div>

                        <div className='form-action max-w-[400px] ml-auto w-full'>
                            <button className='btn btn-form btn--accent' type="submit"> {mutation.isPending ? <SpinnerButton/> : "Add"}</button>
                            <button className='btn btn-form btn--cancel' type="button" onClick={handleClose} >Cancel</button>
                        </div>
                    </Form>)}}
                    
                    </Formik>
                </div>
        </div>
    </ModalWrapper>
    </div>
  )
}

export default ModalAddmenu
