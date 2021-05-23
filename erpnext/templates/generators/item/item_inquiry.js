frappe.ready(() => {
	const d = new frappe.ui.Dialog({
		title: __('Contáctenos'),
		fields: [
			{
				fieldtype: 'Data',
				label: __('Nombre Completo'),
				fieldname: 'lead_name',
				reqd: 1
			},
			{
				fieldtype: 'Data',
				label: __('Nombre de su Organización'),
				fieldname: 'company_name',
			},
			{
				fieldtype: 'Data',
				label: __('Correo'),
				fieldname: 'email_id',
				options: 'Email',
				reqd: 1
			},
			{
				fieldtype: 'Data',
				label: __('Número de Teléfono'),
				fieldname: 'phone',
				options: 'Phone',
				reqd: 1
			},
			{
				fieldtype: 'Data',
				label: __('Detalle'),
				fieldname: 'subject',
				reqd: 1
			},
			{
				fieldtype: 'Text',
				label: __('Mensaje'),
				fieldname: 'message',
				reqd: 1
			}
		],
		primary_action: send_inquiry,
		primary_action_label: __('Enviar')
	});

	function send_inquiry() {
		const values = d.get_values();
		const doc = Object.assign({}, values);
		delete doc.subject;
		delete doc.message;

		d.hide();

		frappe.call('erpnext.shopping_cart.cart.create_lead_for_item_inquiry', {
			lead: doc,
			subject: values.subject,
			message: values.message
		}).then(r => {
			if (r.message) {
				d.clear();
			}
		});
	}

	$('.btn-inquiry').click((e) => {
		const $btn = $(e.target);
		const item_code = $btn.data('item-code');
		d.set_value('subject', 'Consulta acerca de ' + item_code);
		if (!['Administrator', 'Guest'].includes(frappe.session.user)) {
			d.set_value('email_id', frappe.session.user);
			d.set_value('lead_name', frappe.get_cookie('full_name'));
		}

		d.show();
	});
});
