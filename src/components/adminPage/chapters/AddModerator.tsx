import MyButton from '../../../UI/buttons/MyButton'


import React from 'react'
import {useForm} from "react-hook-form";


import AdminInputOption from '../sidebarOptions/AdminInputOption'
import {registerUser} from "../../../asyncActions/users";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {addUsers, setUsers} from "../../../redux/users/slice";
import {useGetCookie} from "../../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {toastError, toastSuccess} from "../../../hooks/useModalAndAlert";


const AddModerator: React.FC = () => {

  const {register, handleSubmit, formState: {errors}, setError} = useForm(
    {
        defaultValues: {
          username: '',
          password: '',
        }
    }
  )

  const dispatch = useDispatch()
  const token = useGetCookie('token')



  const onSubmit = async ({username, password}:{username: string, password: string}) => {
    const data: any = await registerUser({username, password, token})


    if(data.message) {

        if(data.message === 'User with this username already exists') {
          setError('username', {type: 'manual', message: data.message})
            toastError(data.message)
        }
        if(data.message === 'Denied access') {
          setError('username', {type: 'manual', message: data.message})
          setError('password', {type: 'manual', message: data.message})
            toastError(data.message)
        }

    } else {
        await dispatch(addUsers(data.user))
        toastSuccess("The new user was added successfully.")
    }



  }

  return (
      <>
          <div className="admin-content__wrap">
              <div className="admin-content small">
                  <h1 className="label">Add moderator</h1>
                  <div className="admin-sidebar">
                      <form action="components/adminPage/chapters/AddModerator#" onSubmit={handleSubmit(onSubmit)}>
                          <div className="admin-sidebar__options ">
                              <AdminInputOption
                                  placeholder={'Enter login'}
                                  titleOption={'Login'}
                                  error={errors.username}
                                  validRegister={register('username', {required: true})}
                              />
                              <AdminInputOption
                                  placeholder={'Enter password'}
                                  type={'password'}
                                  titleOption={'Password'}
                                  error={errors.password}
                                  validRegister={register('password', {required: true, minLength: {value: 8, message: 'At least 8 characters'}})}
                              />

                              <div className="admin-sidebar__option">
                                  <MyButton>Add moderator</MyButton>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              <div className="admin-sidebar">
                  <div className="admin-sidebar__buttons d-flex jce">
                      <MyButton to={'/admin?chapter=moderators'}><span>← Back to moderators page </span></MyButton>
                  </div>
              </div>
          </div>
          <ToastContainer closeButton={true} />
      </>

  )
}

export default AddModerator
