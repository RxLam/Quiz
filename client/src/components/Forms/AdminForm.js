import React, { useState, useRef } from 'react';

import {
    fetchDeleteCategoryByName,
    fetchGetCategories,
    fetchPostCategories,
    fetchDeleteAllCategories,
} from "../../redux/categories/asyncActions";
import {
    fetchGetQuestions,
    fetchPutQuestions,
    fetchPostQuestions,
} from "../../redux/questions/asyncActions";
import {
    fetchPostVariants,
} from "../../redux/variants/asyncActions";
import {
    Button,
    Form,
    Input,
    InputNumber,
} from 'antd'
import {useAppDispatch} from "../../redux/store";

const { TextArea } = Input


const AdminForm = () => {
    const [componentDisabled, setFormDisabled] = useState(true)
    const [catInput, setCatInput] = useState('')
    const [nameInput, setNameInput] = useState(null)
    const [isNewCat, setIsNewCat] = useState(true)
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const onCatInput = (e) => setCatInput(e.target.value)
    const onNameInput = (e) => setNameInput(e.target.value)
    const [quantityOfVariants, setQuantity] = useState(0)
    const [quantityOfQuestions, setQuestions]  = useState(0)
    const inputRef = useRef(null)
    const questionsInputRef = useRef(null)

    const reload = () => {
        document.location.reload()
    }

    const setFlagForm = () => {
        setFormDisabled(!componentDisabled)
    }

    const getCategoryByName = async (name) => {
        const cats = await dispatch(fetchGetCategories())
        // здесь дергается напрямую из стора т.к. при обращении через селектор проваливается undefined
        const category = cats.payload.find(category => category.name === name)
        return category
    }

    const findQuestionsIdByCatId = async (id) => {
        const questions = await dispatch(fetchGetQuestions())
        const qId = questions.payload.find(question => question.categoryId === Number(id)).id
        return qId
    }

    const addCat = async () => {
        setCatInput(catInput)
        const category = await getCategoryByName(catInput)

        if (category) return alert('Эта категория уже есть')
        else {
            setFlagForm()
            if(isNewCat) {
                await addNewCategory({name: catInput})
            }
        }
    }

    const handleFormSubmit = async (values) => {
        const questions = values.question
        const variants = values.variants
        const corrAnsw = values.corrAnsw-1

        const category = await getCategoryByName(catInput)

        let questionsData = {
            categoryId: category.id,
            questions,
        }

        let variantsData = {
            questionId: null,
            variants,
            correct: corrAnsw,
        }

        if (!isNewCat) {
            questionsData.id = questionsData.categoryId

            await addQuestions(questionsData)

            const questionId = await findQuestionsIdByCatId(questionsData.categoryId)

            variantsData.questionId = questionId

            await addNewVariants(variantsData)

            form.resetFields()
        } else {
            await addNewQuestions(questionsData)

            const questionId = await findQuestionsIdByCatId(questionsData.categoryId)

            variantsData.questionId = questionId

            await addNewVariants(variantsData)

            setIsNewCat(false)

            form.resetFields()
        }
    }

    const addNewCategory = async (categoriesData) => {
        await dispatch(fetchPostCategories(categoriesData))
    }

    const addNewQuestions = async (questionsData) => {
        await dispatch(fetchPostQuestions(questionsData))
    }

    const addNewVariants = async (variantsData) => {
        await dispatch(fetchPostVariants(variantsData))
    }

    const addQuestions = async (questionsData) => {
        await dispatch(fetchPutQuestions(questionsData))
    }

    const delCategoryByName = async () => {
        await dispatch(fetchDeleteCategoryByName({name: nameInput}))
        document.location.reload()
    }

    const delAllCategories = async () => {
        await dispatch(fetchDeleteAllCategories())
        document.location.reload()
    }

    const setQntVariants = () => {
        inputRef.current.resizableTextArea.textArea.value ? setQuantity(inputRef.current.resizableTextArea.textArea.value.split(',').length) : setQuantity(0)
    }

    const setQntQuestions = () => {
        questionsInputRef.current.input.value ? setQuestions(1) : setQuestions(0)
    }

    return (
        <>
            <div style={{width: 300, margin: 'auto', paddingTop: 30}}>
                <lebel>Категория</lebel>
                <Input value={catInput} onInput={onCatInput} disabled={!componentDisabled} placeholder="Введите название категории"
                       allowClear={{ clearIcon: <Button icon="X" onClick={() => setCatInput('')}/>}}/>
                <Button disabled={!componentDisabled || !catInput} onClick={addCat} style={{marginTop: 2}}>
                    Добавить
                </Button>
            </div>
            <Form
                form={form}
                onFinish={(values) => handleFormSubmit(values)}
                disabled={componentDisabled}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600,
                         margin: 'auto',
                         paddingTop: 40
                }}
            >
                <Form.Item label="Вопрос" name="question">
                    <Input ref={questionsInputRef} onChange={setQntQuestions} placeholder="Введите вопрос"/>
                </Form.Item>
                <Form.Item label="Варианты" name="variants">
                    <TextArea ref={inputRef} onChange={setQntVariants} placeholder="Введите варианты через запятую" rows={4} />
                </Form.Item>
                <Form.Item label="№ кор. ответа" name="corrAnsw">
                    <InputNumber type="number" placeholder="Номер" min={1} max={quantityOfVariants}/>
                </Form.Item>
                <Form.Item label="доб. вопрос">
                    <Button disabled={!quantityOfQuestions || !quantityOfVariants} htmlType="submit">Добавить</Button>
                </Form.Item>
                <Form.Item label="доб. нов. кат">
                    <Button disabled={!quantityOfQuestions || !quantityOfVariants} onClick={reload}>Добавить</Button>
                </Form.Item>
            </Form>
            <div style={{width: 700, margin: 'auto', paddingTop: 30, paddingDown: 30, display: 'flex', flexDirection: 'row'}}>
                <div>
                    <lebel>Удалить категорию</lebel>
                    {/*<Input style={{width: 160}} value={idInput} type='number' onInput={onIdInput} placeholder="Введите id категории"/>*/}
                    <Input style={{width: 160, marginLeft: 5}} value={nameInput} onInput={onNameInput} placeholder="Введите название категории"/>
                    <Button style={{marginLeft: 5, marginTop: 2}} onClick={delCategoryByName}>
                        Удалить
                    </Button>
                </div>
                <div style={{marginLeft: 30}}>
                    <lebel>Удалить все категории</lebel>
                    <Button style={{marginLeft: 5, marginTop: 2}} onClick={delAllCategories}>
                        Удалить
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AdminForm