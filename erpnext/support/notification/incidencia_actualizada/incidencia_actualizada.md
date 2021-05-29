<h3>Incidencia actualizada</h3>

<p>Incidencia {{ doc.name }} ha sido actualizada. Por favor tome las acciones requeridas.</p>

<!-- show last comment -->
{% if comments %}
Ultima Actualizacion : {{ comments[-1].comment }} por {{ comments[-1].by }}
{% endif %}

<h4>Detalles</h4>

<ul>
<li>Cliente: {{ doc.customer }}
<li>Detalle: {{ doc.subject }}
</ul>
<p>
<a href="https://clickcg.co/issues?name={{ doc.name }}">Conectarse y Ver en el Navegador</a>