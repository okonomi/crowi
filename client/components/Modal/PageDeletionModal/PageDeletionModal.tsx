import React, { useState, useEffect, useCallback, FC } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from 'reactstrap'
import Crowi from 'client/utils/Crowi'
import Icon from 'components/Common/Icon'

type Props = {
  crowi: Crowi
  pageId: string | null
  revisionId: string | null
}

const PageDeletionModal: FC<Props> = ({ crowi, pageId, revisionId }) => {
  const [show, setShow] = useState(false)

  const handleOpen = useCallback(() => {
    setShow(true)
  }, [setShow])

  const handleClose = useCallback(() => {
    setShow(false)
  }, [setShow])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await crowi.apiPost('/pages.remove', {
        _csrf: crowi.getContext().csrfToken,
        path: crowi.getContext().path,
        page_id: pageId,
        revision_id: revisionId,
      })
      top.location.href = res.page.path
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    $(document).on('click', '[data-target="#deletePage"]', handleOpen)
  }, [handleOpen])

  return (
    <Modal isOpen={show} toggle={handleClose} size="md">
      <Form role="form" onSubmit={handleSubmit}>
        <ModalHeader toggle={handleClose}>
          <Icon name="trashCanOutline" /> Delete Page
        </ModalHeader>
        <ModalBody>
          <ul>
            <li>
              This page will be moved to the <a href="/trash/">trash</a>.
            </li>
          </ul>
          <FormGroup>
            <Label for="">This page:</Label>
            <br />
            <code>{decodeURIComponent(crowi.getContext().path)}</code>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger">Delete!</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PageDeletionModal