module.exports = {

  port: process.env.PORT || 8080,

  staff: {
    ranks: [
      {
        name: 'Anim-Test',
        premium: false,
        customGroupName: 'Animateurs'
      },
      {
        name: 'Animateur',
        premium: false,
        customGroupName: 'Animateurs'
      },
      {
        name: 'Chef-Anim',
        premium: false,
        customGroupName: 'Animateurs'
      },
      {
        name: 'Support',
        premium: true,
        customGroupName: 'Supports'
      },
      {
        name: 'Modo-Test',
        premium: true,
        customGroupName: 'Modérateurs'
      },
      {
        name: 'Modo-Joueur',
        premium: true,
        customGroupName: 'Modérateurs'
      },
      {
        name: 'Chef-Modo',
        premium: true,
        customGroupName: 'Modérateurs'
      },
      {
        name: 'dev',
        premium: true,
        customGroupName: 'Développeurs'
      },
      {
        name: 'Administrateur',
        premium: true,
        customGroupName: 'Administrateurs'
      },
      {
        name: 'fondateur',
        premium: true,
        customGroupName: 'Administrateurs'
      }
    ]
  }

}
