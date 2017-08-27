//@flow
type PropMapper = { [prop_name: string]: (orig_prop: any) => mixed }

export default (prop_mapper: PropMapper) => (child: Object) => {
    const new_props = {}
    Object.keys(prop_mapper).forEach(prop_name => {
      const orig_prop = child.props[prop_name]
      new_props[prop_name] = prop_mapper[prop_name](orig_prop)
    })
    return new_props
  }
