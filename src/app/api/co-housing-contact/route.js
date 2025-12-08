export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { nombre, email, telefono, edad, mensaje } = await req.json();

    // Validaciones
    if (!nombre || nombre.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Nombre inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!telefono || telefono.trim().length < 6) {
      return new Response(JSON.stringify({ error: 'Teléfono inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    // Datos del contacto
    const contactData = {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      edad: edad ? parseInt(edad) : null,
      mensaje: mensaje?.trim() || '',
      fecha: new Date().toISOString(),
      tipo: 'co-housing'
    };

    // Log en consola (en producción, guardar en base de datos)
    console.log('📋 Nueva solicitud de Co-housing:', contactData);

    // TODO: Guardar en base de datos
    // await db.contacts.create(contactData);

    // TODO: Enviar email de notificación al administrador
    // await sendAdminNotification(contactData);

    // TODO: Enviar email de confirmación al usuario
    // await sendUserConfirmation(contactData);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Solicitud recibida correctamente' 
    }), { 
      status: 200, 
      headers: { 'content-type': 'application/json' } 
    });

  } catch (err) {
    console.error('Error procesando solicitud de co-housing:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { 
      status: 500, 
      headers: { 'content-type': 'application/json' } 
    });
  }
}
