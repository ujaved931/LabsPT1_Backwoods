import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as s from "../../styles/CheckoutForm.styles"
import { subscribe } from "../../redux/actions/billing"
import { UserPropTypes } from "../propTypes"
import { Input, Button } from "../../styles/theme/styledComponents"

// Mock Card Element
const MockCardElement = ({ onChange, onReady }) => {
  React.useEffect(() => {
    if (onReady) {
      onReady({ focus: () => {} })
    }
  }, [onReady])

  return (
    <div className="mock-card-element" style={{
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9',
      color: '#666'
    }}>
      [Mock Card Input - Demo Mode]
    </div>
  )
}

class CheckoutForm extends Component {
  state = {
    name: "",
    country: "",
    postal_code: "",
    state: "",
    line1: "",
    line2: "",
    city: ""
  }

  submit = () => {
    const { name, line1, line2, city, state, postal_code, country } = this.state
    const owner = {
      name,
      address: {
        line1,
        line2,
        city,
        state,
        postal_code,
        country
      }
    }
    // Mock subscription without Stripe
    this.props.subscribe({
      id: this.props.user.id,
      owner,
      mock: true // Flag to indicate this is a mock subscription
    })
  }

  handleChangeCard = card => {
    this.setState({ card })
  }

  handleChangeOwnerInfo = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    const { name, line1, line2, city, state, postal_code, country } = this.state

    return (
      <s.CheckoutFormStyles>
        <div className="stripe-card-input">
          <MockCardElement
            onChange={this.handleChangeCard}
            onReady={el => el && el.focus && el.focus()}
          />
        </div>
        <Input
          id="name"
          type="text"
          placeholder="Name on card"
          value={name}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="line1"
          type="text"
          placeholder="Address line 1"
          value={line1}
          onChange={this.handleChangeOwnerInfo}
        />
        <Input
          id="line2"
          type="text"
          placeholder="Address line 2"
          value={line2}
          onChange={this.handleChangeOwnerInfo}
        />
        <div className="form-city-state">
          <Input
            id="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="state"
            type="text"
            placeholder="State"
            value={state}
            onChange={this.handleChangeOwnerInfo}
          />
          <Input
            id="postal_code"
            type="number"
            placeholder="Zip"
            value={postal_code}
            onChange={this.handleChangeOwnerInfo}
          />
        </div>
        <Input
          id="country"
          type="text"
          placeholder="Country"
          value={country}
          onChange={this.handleChangeOwnerInfo}
        />
        <Button className="input-button" onClick={this.submit}>
          Subscribe Now (Demo Mode)
        </Button>
      </s.CheckoutFormStyles>
    )
  }
}

CheckoutForm.propTypes = {
  subscribe: PropTypes.func.isRequired,
  user: UserPropTypes
}

const mapStateToProps = ({ auth: { user } }) => ({ user })

// Remove injectStripe wrapper for mock version
export default connect(
  mapStateToProps,
  { subscribe }
)(CheckoutForm)
