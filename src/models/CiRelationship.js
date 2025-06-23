module.exports = (sequelize, DataTypes) => {
    const CiRelationship = sequelize.define('CiRelationship', {
        parentCiId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'ConfigurationItems',
                key: 'id'
            }
        },
        childCiId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'ConfigurationItems',
                key: 'id'
            }
        },
        relationType: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    return CiRelationship;
};